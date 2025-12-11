'use client';

import Link from 'next/link';
import { Button, Container, Text, View } from 'reshaped';
import styles from './styles.module.scss';

const problems = [
  {
    icon: 'movie_edit',
    title: 'Não Sabe Editar Vídeos?',
    description:
      'Ótimo! Nosso método não exige nenhuma habilidade de edição. Se você sabe usar a câmera do celular, está pronto para começar.',
  },
  {
    icon: 'schedule',
    title: 'Não Tem Tempo?',
    description:
      'Dedique apenas alguns minutos por dia. É perfeito para quem tem uma rotina corrida e quer uma renda extra sem comprometer o tempo.',
  },
  {
    icon: 'devices',
    title: 'Acha que Precisa de Equipamento Caro?',
    description:
      'Seu celular é a única ferramenta que você precisa. Sem câmeras, microfones ou computadores potentes.',
  },
];

export const Problem = () => {
  return (
    <section className={styles.problem} id="problem">
      <Container>
        <Text as="h2" variant="title-6" className={styles.title}>
          Você Quer Ganhar Dinheiro de Casa, Mas...
        </Text>

        <Text as="p" className={styles.subtitle}>
          Se você se identifica com algum desses pontos, você está no lugar
          certo. Nosso método foi criado para superar exatamente estes
          obstáculos.
        </Text>

        <div className={styles.grid}>
          {problems.map((problem, index) => {
            return (
              <div key={index} className={styles.card}>
                <div className={styles.iconWrapper}>
                  <span
                    className="material-symbols-rounded"
                    style={{ fontSize: '32px' }}
                  >
                    {problem.icon}
                  </span>
                </div>
                <h3 className={styles.cardTitle}>{problem.title}</h3>
                <p className={styles.cardDescription}>{problem.description}</p>
              </div>
            );
          })}
        </div>

        <Text as="h3" variant="title-6" className={styles.title}>
          Quer entender como é possível?
        </Text>

        <View direction="row" gap={2} align="center" justify="center">
          <Link href="/lead">
            <Button size="large" color="primary" variant="solid">
              <strong>Baixe nosso guia grátis</strong>
            </Button>
          </Link>

          <Link href="#pricing">
            <Button variant="outline" size="large">
              Quero ir logo para a prática
            </Button>
          </Link>
        </View>
      </Container>
    </section>
  );
};
