/* eslint-disable no-console */
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { ebookGuideTemplate } from '@/app/templates/ebook-guide';
import { generateEbookHash, storeEbookHash } from '@/lib/ebook-hash';
import { getTransporter } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      instagram,
      unemployedOrSeekingIncome,
      likesAppearingInVideos,
      wantsCreativeGuide,
      productAffinity,
    } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nome e email são obrigatórios' },
        { status: 400 },
      );
    }

    const transporter = getTransporter();
    const now = new Date();
    const timestamp = now.toISOString();

    // Generate hash for ebook download
    const ebookHash = generateEbookHash(email);
    storeEbookHash(ebookHash, email);

    // Get ebook download link with hash
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const ebookLink = `${siteUrl}/ebook/${ebookHash}`;

    // Send email to user with ebook download link
    const handlebars = await import('handlebars');
    const template = handlebars.compile(ebookGuideTemplate);
    const emailHtml = template({
      name,
      email,
      ebookLink,
    });

    // Path to the ebook PDF file
    const ebookPath = path.join(process.cwd(), 'public', 'ebook.pdf');

    await transporter.sendMail({
      from: `Fran UGC <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Seu Guia Gratuito de UGC está Pronto! 📚',
      html: emailHtml,
      attachments: [
        {
          filename: 'guia-ugc-gratuito.pdf',
          path: ebookPath,
        },
      ],
    });

    // Optional: Send notification email to admin
    if (process.env.ADMIN_EMAIL) {
      const productLabels: Record<string, string> = {
        beleza: 'Beleza',
        saude: 'Saúde',
        fitness: 'Fitness',
        alimentacao: 'Alimentação',
      };

      const formattedAffinity = productAffinity
        ? productAffinity.map((p: string) => productLabels[p] || p).join(', ')
        : 'Nenhuma selecionada';

      const adminHtml = `
        <h2>Nova Inscrição - Lead Page</h2>
        <h3>Informações Pessoais</h3>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
        <p><strong>Instagram:</strong> ${instagram || 'Não informado'}</p>
        
        <h3>Respostas</h3>
        <p><strong>Está desempregada(o) ou procurando fazer renda sem sair de casa?</strong> ${unemployedOrSeekingIncome === 'sim' ? 'Sim' : unemployedOrSeekingIncome === 'nao' ? 'Não' : 'Não respondido'}</p>
        <p><strong>Gosta de aparecer em vídeos para internet?</strong> ${likesAppearingInVideos === 'sim' ? 'Sim' : likesAppearingInVideos === 'nao' ? 'Não' : 'Não respondido'}</p>
        <p><strong>Gostaria de receber um guia criativo?</strong> ${wantsCreativeGuide === 'sim' ? 'Sim' : wantsCreativeGuide === 'nao' ? 'Não' : 'Não respondido'}</p>
        <p><strong>Afinidade com produtos:</strong> ${formattedAffinity}</p>
        <p><strong>Data/Hora:</strong> ${timestamp}</p>
      `;

      await transporter.sendMail({
        from: `Fran UGC <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `Nova Inscrição - ${name}`,
        html: adminHtml,
      });
    }

    // Send data to webhook
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            phone,
          }),
        });
      } catch (webhookError) {
        console.error('Error sending data to webhook:', webhookError);
        // We don't block the response if webhook fails
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { error: 'Erro ao processar formulário' },
      { status: 500 },
    );
  }
}
