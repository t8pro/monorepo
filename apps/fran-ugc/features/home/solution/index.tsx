'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button, Container, Text } from 'reshaped';
import styles from './styles.module.scss';

const steps = [
  {
    image: '/how-works-1.png',
    title: '1. Grave com seu Celular',
    description:
      'Siga o nosso treinamento e grave vídeos curtos e simples sobre produtos ou serviços.',
  },
  {
    image: '/how-works-2.png',
    title: '2. Envie para as Marcas',
    description:
      'Nós te mostramos como encontrar as marcas que pagam e como enviar seu material.',
  },
  {
    image: '/how-works-3.png',
    title: '3. Receba o Pagamento',
    description:
      'Receba o dinheiro diretamente na sua conta, sem burocracia e sem intermediários.',
  },
];

export const Solution = () => {
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#' + id);
    }
  };
  return (
    <section className={styles.solution} id="solution">
      <Container>
        <Text as="h2" variant="title-6" className={styles.title}>
          Como Funciona: o UGC na prática?
        </Text>

        <p className={styles.subtitle}>
          Simplificamos o processo para que qualquer pessoa possa começar a
          faturar. São 3 passos simples que separam você de uma nova fonte de
          renda.
        </p>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.stepImage}>
                <Image
                  src={step.image}
                  alt={step.title}
                  width={600}
                  height={600}
                  className={styles.image}
                />
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <Link href="#pricing" onClick={e => handleScroll(e, 'pricing')}>
            <Button size="large" color="primary" variant="solid">
              <strong>Quero Garantir Minha Vaga</strong>
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};
