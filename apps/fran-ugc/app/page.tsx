import { Metadata } from 'next';
import { Curriculum } from '@/features/home/curriculum';
import { FAQ } from '@/features/home/faq';
import { FinalCTA } from '@/features/home/final-cta';
import { Hero } from '@/features/home/hero';
import { Pricing } from '@/features/home/pricing';
import { Problem } from '@/features/home/problem';
import { Solution } from '@/features/home/solution';
import { Testimonials } from '@/features/home/testimonials';

export const metadata: Metadata = {
  title:
    'Método Descomplicado: Crie Vídeos com Seu Celular e Ganhe Dinheiro | UGC em Prática',
  description:
    'Aprenda um método descomplicado de criar vídeos com seu celular, enviar para marcas e ganhar dinheiro trabalhando de casa. Guia completo de UGC em prática.',
};

export default function Home() {
  return (
    <main id="home">
      <Hero />
      <Problem />
      <Solution />
      <Curriculum />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
