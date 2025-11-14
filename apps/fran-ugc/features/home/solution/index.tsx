'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button, Container, Text } from 'reshaped';
import styles from './styles.module.scss';

const steps = [
  {
    image: '/how-works-1.png',
    title: 'Crie com o Celular',
    description:
      'Aprenda a criar vídeos profissionais usando apenas seu smartphone, sem precisar de equipamentos caros.',
  },
  {
    image: '/how-works-2.png',
    title: 'Encontre as Marcas',
    description:
      'Descubra onde e como encontrar marcas que pagam bem por conteúdo UGC e como fazer pitches irresistíveis.',
  },
  {
    image: '/how-works-3.png',
    title: 'Ganhe Dinheiro',
    description:
      'Comece a faturar criando vídeos autênticos no seu tempo e transforme isso em uma renda recorrente.',
  },
];

export const Solution = () => {
  return (
    <section className={styles.solution} id="solution">
      <Container>
        <Text as="h2" variant="title-6" className={styles.title}>
          Como Funciona: o UGC em prática?
        </Text>

        <p className={styles.subtitle}>
          Um método descomplicado em 3 passos para você começar a ganhar
          dinheiro criando conteúdo para marcas.
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
          <Link href="#curriculum">
            <Button size="large" color="primary" variant="solid">
              <strong>Ver conteúdo completo do curso</strong>
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};
