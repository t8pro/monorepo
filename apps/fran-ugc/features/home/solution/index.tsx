'use client';

import { FaVideo, FaHandshake, FaDollarSign } from 'react-icons/fa';
import { Container } from 'reshaped';
import styles from './styles.module.scss';

const steps = [
  {
    icon: FaVideo,
    number: '1',
    title: 'Crie com o Celular',
    description:
      'Aprenda a criar vídeos profissionais usando apenas seu smartphone, sem precisar de equipamentos caros.',
  },
  {
    icon: FaHandshake,
    number: '2',
    title: 'Encontre as Marcas',
    description:
      'Descubra onde e como encontrar marcas que pagam bem por conteúdo UGC e como fazer pitches irresistíveis.',
  },
  {
    icon: FaDollarSign,
    number: '3',
    title: 'Ganhe Dinheiro',
    description:
      'Comece a faturar criando vídeos autênticos no seu tempo e transforme isso em uma renda recorrente.',
  },
];

export const Solution = () => {
  return (
    <section className={styles.solution} id="solution">
      <Container>
        <h2 className={styles.title}>Como Funciona: o UGC em prática?</h2>

        <p className={styles.subtitle}>
          Um método descomplicado em 3 passos para você começar a ganhar
          dinheiro criando conteúdo para marcas.
        </p>

        <div className={styles.steps}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className={styles.step}>
                <div className={styles.stepNumber}>{step.number}</div>
                <div className={styles.stepIcon}>
                  <Icon size={40} />
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.cta}>
          <a href="#curriculum" className={styles.ctaButton}>
            Ver conteúdo completo do curso
          </a>
        </div>
      </Container>
    </section>
  );
};
