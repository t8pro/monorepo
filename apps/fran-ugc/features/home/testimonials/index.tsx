'use client';

import { Container, View, Text, Card, Grid, Avatar } from 'reshaped';
import styles from './styles.module.scss';

const testimonials = [
  {
    name: 'Maria Silva',
    role: 'Criadora de Conteúdo',
    content: 'Em 2 meses já consegui fechar 5 contratos com marcas. O método é realmente prático e funciona!',
    avatar: '👩',
  },
  {
    name: 'João Santos',
    role: 'Empreendedor Digital',
    content: 'Finalmente consegui transformar minha paixão por criar vídeos em uma fonte de renda real.',
    avatar: '👨',
  },
  {
    name: 'Ana Costa',
    role: 'Influenciadora',
    content: 'As técnicas de negociação me ajudaram a aumentar meus ganhos em 300%. Recomendo muito!',
    avatar: '👩‍💼',
  },
];

export const Testimonials = () => {
  return (
    <section className={styles.testimonials}>
      <Container>
        <View gap={8} align="center">
          <View.Item>
            <Text variant="featured-2" weight="bold" as="h2" align="center">
              O que nossos alunos dizem
            </Text>
          </View.Item>

          <View.Item>
            <Grid columns={{ s: 1, m: 3 }} gap={4}>
              {testimonials.map((testimonial, index) => (
                <Grid.Item key={index}>
                  <Card padding={5}>
                    <View gap={4}>
                      <View.Item>
                        <Text variant="body-2" style={{ fontStyle: 'italic' }}>
                          "{testimonial.content}"
                        </Text>
                      </View.Item>
                      <View.Item>
                        <View direction="row" gap={3} align="center">
                          <View.Item>
                            <Avatar size="small">{testimonial.avatar}</Avatar>
                          </View.Item>
                          <View.Item grow>
                            <View gap={1}>
                              <View.Item>
                                <Text variant="body-2" weight="bold">
                                  {testimonial.name}
                                </Text>
                              </View.Item>
                              <View.Item>
                                <Text variant="caption-1" color="neutral-faded">
                                  {testimonial.role}
                                </Text>
                              </View.Item>
                            </View>
                          </View.Item>
                        </View>
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



