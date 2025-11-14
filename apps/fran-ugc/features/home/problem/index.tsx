'use client';

import {
  FaRegClock,
  FaRegQuestionCircle,
  FaRegLightbulb,
} from 'react-icons/fa';
import { Container } from 'reshaped';
import styles from './styles.module.scss';

const problems = [
  {
    icon: FaRegClock,
    title: 'Falta de Tempo?',
    description:
      'Imagine ganhar dinheiro criando vídeos rápidos de 15 a 60 segundos, sem precisar aparecer ou ter seguidores.',
  },
  {
    icon: FaRegQuestionCircle,
    title: 'Não sabe por onde começar?',
    description:
      'Te mostro o passo a passo completo para criar conteúdo que as marcas querem e começar a faturar.',
  },
  {
    icon: FaRegLightbulb,
    title: 'Quer trabalhar de casa?',
    description:
      'Descubra como transformar seu celular em uma máquina de gerar renda trabalhando no seu tempo.',
  },
];

export const Problem = () => {
  return (
    <section className={styles.problem} id="problem">
      <Container>
        <h2 className={styles.title}>
          Você Quer Ganhar Dinheiro de Casa, Mas...
        </h2>

        <div className={styles.grid}>
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div key={index} className={styles.card}>
                <div className={styles.iconWrapper}>
                  <Icon size={32} />
                </div>
                <h3 className={styles.cardTitle}>{problem.title}</h3>
                <p className={styles.cardDescription}>{problem.description}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.cta}>
          <a href="#pricing" className={styles.ctaButton}>
            Descubra como começar a ganhar!
          </a>
        </div>
      </Container>
    </section>
  );
};
