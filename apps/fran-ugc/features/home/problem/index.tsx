'use client';

import { Container, View, Text, Card, Grid } from 'reshaped';
import styles from './styles.module.scss';

const problems = [
  {
    icon: 'indeterminate_question_box',
    title: 'Métodos Complicados',
    description:
      'Você já tentou seguir tutoriais complexos que não funcionam na prática?',
  },
  {
    icon: 'money_off',
    title: 'Falta de Oportunidades',
    description:
      'Não sabe como encontrar marcas que pagam bem pelo seu conteúdo?',
  },
  {
    icon: 'schedule',
    title: 'Perda de Tempo',
    description:
      'Gasta horas criando vídeos que não geram resultados ou dinheiro?',
  },
  {
    icon: 'help',
    title: 'Sem Direcionamento',
    description: 'Não tem clareza sobre o que as marcas realmente querem ver?',
  },
];

export const Problem = () => {
  return (
    <section className={styles.problem}>
      <Container>
        <View gap={8} align="center">
          <View.Item>
            <Text variant="featured-2" weight="bold" as="h2" align="center">
              Você já passou por isso?
            </Text>
          </View.Item>

          <View.Item>
            <Grid columns={{ s: 1, m: 2, l: 4 }} gap={4}>
              {problems.map((problem, index) => (
                <Grid.Item key={index}>
                  <Card padding={4}>
                    <View gap={3} align="center">
                      <View.Item>
                        <span
                          className="material-symbols-rounded"
                          style={{ fontSize: '48px' }}
                        >
                          {problem.icon}
                        </span>
                      </View.Item>
                      <View.Item>
                        <Text variant="body-2" weight="bold" align="center">
                          {problem.title}
                        </Text>
                      </View.Item>
                      <View.Item>
                        <Text variant="caption-1" align="center">
                          {problem.description}
                        </Text>
                      </View.Item>
                    </View>
                  </Card>
                </Grid.Item>
              ))}
            </Grid>
          </View.Item>
        </View>
      </Container>
    </section>
  );
};
