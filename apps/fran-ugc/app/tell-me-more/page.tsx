import { Metadata } from 'next';
import { TellMeMoreForm } from '@/features/tell-me-more/form';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://ugcnapratica.com.br';

export const metadata: Metadata = {
  title: 'Conte-me mais sobre você',
  description:
    'Preencha o formulário para receber o guia completo de UGC em prática e começar a ganhar dinheiro criando vídeos com seu celular. Acesso imediato ao curso completo.',
  alternates: {
    canonical: `${siteUrl}/tell-me-more`,
  },
  openGraph: {
    url: `${siteUrl}/tell-me-more`,
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TellMeMore() {
  return <TellMeMoreForm />;
}
