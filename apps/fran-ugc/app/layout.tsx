import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Figtree, Young_Serif } from 'next/font/google';
import localFont from 'next/font/local';
import { Suspense } from 'react';
import { Providers } from './providers';
import '@/styles/themes/fran/theme.css';
import '@/styles/globals.scss';
import { DataLayer } from '@/components/DataLayer';
import { FacebookPixel } from '@/components/FacebookPixel';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { WhatsAppButton } from '@/components/whats-app';

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const youngSerif = Young_Serif({
  variable: '--font-young-serif',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'serif'],
});

const materialSymbols = localFont({
  src: './fonts/material-symbols-rounded.woff2',
  variable: '--font-material-symbols',
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl || 'http://localhost:3000'),
  title: {
    default: 'UGC na Prática',
    template: '%s | UGC na Prática',
  },
  description:
    'Aprenda um método descomplicado de criar vídeos com seu celular, enviar para marcas e ganhar dinheiro trabalhando de casa. Curso completo de UGC (User Generated Content) com 6 módulos práticos. Transforme seu celular em uma fonte de renda.',
  keywords: [
    'UGC',
    'user generated content',
    'criar vídeos',
    'trabalhar de casa',
    'ganhar dinheiro online',
    'vídeos para marcas',
    'conteúdo para marcas',
    'curso UGC',
    'curso de UGC',
    'como criar vídeos UGC',
    'trabalho home office',
    'renda extra',
    'criador de conteúdo',
    'influencer',
    'vídeos profissionais',
    'conteúdo para Instagram',
    'TikTok',
    'Reels',
  ],
  authors: [
    { name: 'Francieli Azevedo', url: 'https://instagram.com/byfranazevedo' },
  ],
  creator: 'Francieli Azevedo',
  publisher: 'UGC na Prática',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName: 'UGC na Prática',
    title: 'UGC na Prática - Curso Completo de User Generated Content',
    description:
      'Aprenda um método descomplicado de criar vídeos com seu celular, enviar para marcas e ganhar dinheiro trabalhando de casa. Curso completo de UGC com 6 módulos práticos.',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'UGC na Prática - Curso Completo de User Generated Content',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UGC na Prática - Curso Completo de User Generated Content',
    description:
      'Aprenda um método descomplicado de criar vídeos com seu celular, enviar para marcas e ganhar dinheiro trabalhando de casa.',
    creator: '@byfranazevedo',
    images: [`${siteUrl}/og-image.jpg`],
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
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Adicione aqui os códigos de verificação quando disponíveis
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'UGC na Prática',
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    sameAs: ['https://instagram.com/byfranazevedo'],
    founder: {
      '@type': 'Person',
      name: 'Francieli Azevedo',
      url: 'https://instagram.com/byfranazevedo',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: 'Portuguese',
    },
  };

  const courseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'UGC na Prática',
    description:
      'Aprenda um método descomplicado de criar vídeos com seu celular, enviar para marcas e ganhar dinheiro trabalhando de casa. Curso completo de UGC com 6 módulos práticos.',
    provider: {
      '@type': 'Organization',
      name: 'UGC na Prática',
      url: siteUrl,
    },
    courseCode: 'UGC-PRATICA',
    educationalLevel: 'Beginner',
    inLanguage: 'pt-BR',
    teaches: [
      'Criação de vídeos UGC',
      'User Generated Content',
      'Trabalho home office',
      'Negociação com marcas',
      'Edição de vídeos no celular',
      'Pitch para marcas',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      price: '29.64',
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      url: `${siteUrl}/lead`,
    },
  };

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'UGC na Prática',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="pt-BR" data-rs-theme="fran" suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-P9H6BTL3" />
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(courseStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
      </head>
      <body
        className={`${figtree.variable} ${youngSerif.variable} ${materialSymbols.variable}`}
      >
        <main>
          <Providers>
            <Suspense fallback={null}>
              <DataLayer />
            </Suspense>
            <Suspense fallback={null}>
              <FacebookPixel />
            </Suspense>
            <Header />
            <WhatsAppButton />
            {children}
            <Footer />
          </Providers>
        </main>
      </body>
    </html>
  );
}
