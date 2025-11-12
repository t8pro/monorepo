'use client';

import { Container, View, Text, Card, Button, Badge } from 'reshaped';
import Link from 'next/link';
import styles from './styles.module.scss';

const bonuses = [
  'Templates de pitch prontos para usar',
  'Lista de marcas que contratam UGC',
  'Grupo exclusivo de alunos',
  'Suporte por 6 meses',
];

export const Pricing = () => {
  return (
    <section className={styles.pricing}>
      <Container>
        <View gap={8} align="center">
          <View.Item>
            <Text variant="featured-2" weight="bold" as="h2" align="center">
              Investimento
            </Text>
          </View.Item>

          <View.Item>
            <Card padding={8} className={styles.pricingCard}>
              <View gap={6} align="center">
                <View.Item>
                  <Badge color="positive">Oferta Especial</Badge>
                </View.Item>

                <View.Item>
                  <View direction="row" gap={2} align="baseline" justify="center">
                    <View.Item>
                      <Text variant="caption-1" color="neutral-faded" decoration="line-through">
                        R$ 497
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="featured-1" weight="bold">
                        R$ 297
                      </Text>
                    </View.Item>
                  </View>
                  <Text variant="caption-1" color="neutral-faded" align="center">
                    Pagamento único
                  </Text>
                </View.Item>

                <View.Item>
                  <View gap={3} className={styles.bonusesList}>
                    <View.Item>
                      <Text variant="body-2" weight="bold">
                        O que está incluído:
                      </Text>
                    </View.Item>
                    {bonuses.map((bonus, index) => (
                      <View.Item key={index}>
                        <View direction="row" gap={2} align="center">
                          <View.Item>
                            <span className="material-symbols-rounded" style={{ fontSize: '20px', color: '#22c55e' }}>
                              check_circle
                            </span>
                          </View.Item>
                          <View.Item grow>
                            <Text variant="body-2">{bonus}</Text>
                          </View.Item>
                        </View>
                      </View.Item>
                    ))}
                  </View>
                </View.Item>

                <View.Item>
                  <Link href="/tell-me-more">
                    <Button size="large" fullWidth>
                      Quero começar agora
                    </Button>
                  </Link>
                </View.Item>

                <View.Item>
                  <View direction="row" gap={2} align="center" justify="center">
                    <View.Item>
                      <span className="material-symbols-rounded" style={{ fontSize: '20px', color: '#22c55e' }}>
                        verified
                      </span>
                    </View.Item>
                    <View.Item>
                      <Text variant="caption-1" align="center">
                        Garantia de 7 dias ou seu dinheiro de volta
                      </Text>
                    </View.Item>
                  </View>
                </View.Item>
              </View>
            </Card>
          </View.Item>
        </View>
      </Container>
    </section>
  );
};



