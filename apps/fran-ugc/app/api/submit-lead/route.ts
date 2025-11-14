/* eslint-disable no-console */
import { NextRequest, NextResponse } from 'next/server';
import { ebookGuideTemplate } from '@/app/templates/ebook-guide';
import { generateEbookHash, storeEbookHash } from '@/lib/ebook-hash';
import { getTransporter } from '@/lib/email';
import { appendLeadToSheet } from '@/lib/google-sheets';

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

    await transporter.sendMail({
      from: `Fran UGC <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Seu Guia Gratuito de UGC está Pronto! 📚',
      html: emailHtml,
    });

    // Save lead to Google Sheets
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    if (spreadsheetId) {
      try {
        await appendLeadToSheet(
          spreadsheetId,
          {
            timestamp,
            name,
            email,
            phone,
            instagram,
            unemployedOrSeekingIncome,
            likesAppearingInVideos,
            wantsCreativeGuide,
            productAffinity: Array.isArray(productAffinity)
              ? productAffinity.join(', ')
              : productAffinity || '',
          },
          process.env.GOOGLE_SHEETS_SHEET_NAME || 'Sheet1',
        );
      } catch (sheetsError) {
        // Log error but don't fail the request if Sheets fails
        console.error('Error saving to Google Sheets:', sheetsError);
      }
    }

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

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { error: 'Erro ao processar formulário' },
      { status: 500 },
    );
  }
}
