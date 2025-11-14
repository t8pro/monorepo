import { Metadata } from 'next';
import LeadForm from '@/features/lead/form';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://ugc.francieliazevedo.com';

export const metadata: Metadata = {
  title: 'Receba seu guia gratuito de UGC',
  description:
    'Preencha o formulário para receber o guia completo e gratuito de UGC em prática e começar a ganhar dinheiro criando vídeos com seu celular. Acesso imediato.',
  alternates: {
    canonical: `${siteUrl}/lead`,
  },
  openGraph: {
    url: `${siteUrl}/lead`,
    type: 'website',
    title: 'Receba seu guia gratuito de UGC',
    description:
      'Preencha o formulário para receber o guia completo e gratuito de UGC em prática e começar a ganhar dinheiro criando vídeos com seu celular.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LeadPage() {
  return <LeadForm />;
}
