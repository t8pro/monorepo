import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ugcnapratica.com.br';

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

export default function TellMeMoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}





