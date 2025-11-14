import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Hero } from '@/features/home/hero';

// Lazy load below-the-fold components
const Problem = dynamic(() =>
  import('@/features/home/problem').then(mod => ({ default: mod.Problem })),
);
const Solution = dynamic(() =>
  import('@/features/home/solution').then(mod => ({ default: mod.Solution })),
);
const Curriculum = dynamic(() =>
  import('@/features/home/curriculum').then(mod => ({
    default: mod.Curriculum,
  })),
);
const FAQ = dynamic(() =>
  import('@/features/home/faq').then(mod => ({ default: mod.FAQ })),
);
const Pricing = dynamic(() =>
  import('@/features/home/pricing').then(mod => ({ default: mod.Pricing })),
);
const Testimonials = dynamic(() =>
  import('@/features/home/testimonials').then(mod => ({
    default: mod.Testimonials,
  })),
);

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
