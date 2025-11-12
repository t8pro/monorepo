'use client';

import { Container, View, Text, Card, Grid } from 'reshaped';
import styles from './styles.module.scss';

const benefits = [
  {
    icon: 'smartphone',
    title: 'Crie com Seu Celular',
    description: 'Aprenda técnicas profissionais usando apenas o celular que você já tem.',
  },
  {
    icon: 'trending_up',
    title: 'Aumente Sua Renda',
    description: 'Descubra como ganhar dinheiro criando conteúdo autêntico para marcas.',
  },
  {
    icon: 'home',
    title: 'Trabalhe de Casa',
    description: 'Tenha flexibilidade e liberdade trabalhando no conforto da sua casa.',
  },
  {
    icon: 'school',
    title: 'Método Comprovado',
    description: 'Siga um método testado e aprovado por criadores de conteúdo.',
  },
  {
    icon: 'groups',
    title: 'Conecte-se com Marcas',
    description: 'Aprenda como encontrar e se conectar com marcas que pagam bem.',
  },
  {
    icon: 'rocket_launch',
    title: 'Resultados Rápidos',
    description: 'Veja resultados práticos desde as primeiras semanas.',
  },
];

export const Solution = () => {
  return (
    <section className={styles.solution}>
      <Container>
        <View gap={8} align="center">
          <View.Item>
            <Text variant="featured-2" weight="bold" as="h2" align="center">
              O que você vai aprender
            </Text>
          </View.Item>

          <View.Item>
            <Text variant="body-1" align="center" maxWidth="700px">
              Um método descomplicado e prático para criar vídeos profissionais,
              conectar-se com marcas e transformar seu celular em uma fonte de renda.
            </Text>
          </View.Item>

          <View.Item>
            <Grid columns={{ s: 1, m: 2, l: 3 }} gap={4}>
              {benefits.map((benefit, index) => (
                <Grid.Item key={index}>
                  <Card padding={5}>
                    <View gap={3}>
                      <View.Item>
                        <span className="material-symbols-rounded" style={{ fontSize: '40px', color: '#679a58' }}>
                          {benefit.icon}
                        </span>
                      </View.Item>
                      <View.Item>
                        <Text variant="body-2" weight="bold">
                          {benefit.title}
                        </Text>
                      </View.Item>
                      <View.Item>
                        <Text variant="caption-1">
                          {benefit.description}
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



