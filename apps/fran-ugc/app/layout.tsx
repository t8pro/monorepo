import type { Metadata } from 'next';
import { JetBrains_Mono, Montserrat } from 'next/font/google';
import localFont from 'next/font/local';
import '@t8pro/design-system/styles';
import { Providers } from './providers';

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
  title: '24-Hour Menu Visual Upgrade - Landing Page (US)',
  description:
    'AI + human touch. Pixel-perfect crops for Uber Eats, DoorDash, Grubhub, and Instagram. Zero contract. Money-back guarantee.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${jetBrainsMono.variable} ${materialSymbols.variable}`}
        style={{ backgroundColor: 'var(--color-secondary-invert)' }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
