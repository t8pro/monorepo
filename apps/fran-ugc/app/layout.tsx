import type { Metadata } from 'next';
import { JetBrains_Mono, Montserrat } from 'next/font/google';
import localFont from 'next/font/local';
import { Providers } from './providers';
import '@/styles/globals.scss';
import 'reshaped/themes/slate/theme.css';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
});

const jetBrainsMono = JetBrains_Mono({
  variable: '--jet-brains-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const materialSymbols = localFont({
  src: './fonts/material-symbols-rounded.woff2',
  variable: '--font-material-symbols',
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title:
    'Método Descomplicado: Crie Vídeos com Seu Celular e Ganhe Dinheiro | UGC em Prática',
  description:
    'Aprenda um método descomplicado de criar vídeos com seu celular, enviar para marcas e ganhar dinheiro trabalhando de casa. Guia completo de UGC em prática.',
  keywords: [
    'UGC',
    'user generated content',
    'criar vídeos',
    'trabalhar de casa',
    'ganhar dinheiro online',
    'vídeos para marcas',
    'conteúdo para marcas',
    'curso UGC',
  ],
  authors: [{ name: 'UGC em Prática' }],
  openGraph: {
    title: 'Método Descomplicado: Crie Vídeos com Seu Celular e Ganhe Dinheiro',
    description:
      'Aprenda um método descomplicado de criar vídeos com seu celular, enviar para marcas e ganhar dinheiro trabalhando de casa.',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Método Descomplicado: Crie Vídeos com Seu Celular e Ganhe Dinheiro',
    description:
      'Aprenda um método descomplicado de criar vídeos com seu celular, enviar para marcas e ganhar dinheiro trabalhando de casa.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'UGC em Prática - Método Descomplicado de Criar Vídeos',
    description:
      'Aprenda um método descomplicado de criar vídeos com seu celular, enviar para marcas e ganhar dinheiro trabalhando de casa.',
    provider: {
      '@type': 'Organization',
      name: 'UGC em Prática',
    },
    courseCode: 'UGC-PRATICA',
    educationalLevel: 'Beginner',
    inLanguage: 'pt-BR',
  };

  return (
    <html lang="pt-BR" data-rs-theme="slate" data-rs-color-mode="light">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${jetBrainsMono.variable} ${materialSymbols.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
