import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conte-me mais sobre você | UGC em Prática',
  description:
    'Preencha o formulário para receber o guia completo de UGC em prática e começar a ganhar dinheiro criando vídeos com seu celular.',
};

export default function TellMeMoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}



