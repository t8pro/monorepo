import { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Curriculum } from '@/features/home/curriculum';
import { FAQ } from '@/features/home/faq';
import { Hero } from '@/features/home/hero';
import { Pricing } from '@/features/home/pricing';
import { Problem } from '@/features/home/problem';
import { Solution } from '@/features/home/solution';
import { Testimonials } from '@/features/home/testimonials';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://ugc.francieliazevedo.com';

export const metadata: Metadata = {
  title: 'UGC na Prática - Curso Completo de User Generated Content',
  description:
    'Aprenda um método descomplicado de criar vídeos com seu celular, enviar para marcas e ganhar dinheiro trabalhando de casa. Curso completo de UGC (User Generated Content) com 6 módulos práticos. Transforme seu celular em uma fonte de renda.',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    url: siteUrl,
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="home">
        <Hero />
        <Problem />
        <Solution />
        <Curriculum />
        <FAQ />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
