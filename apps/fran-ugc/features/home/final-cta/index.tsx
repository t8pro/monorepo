'use client';

import Link from 'next/link';
import { Container, View, Text, Button, Card } from 'reshaped';
import styles from './styles.module.scss';

export const FinalCTA = () => {
  return (
    <section className={styles.finalCta}>
      <Container>
        <Card padding={8} className={styles.ctaCard}>
          <View gap={6} align="center">
            <View.Item>
              <Text variant="featured-1" weight="bold" as="h2" align="center">
                Não perca esta oportunidade!
              </Text>
            </View.Item>

            <View.Item>
              <div style={{ maxWidth: '600px' }}>
                <Text variant="body-1" align="center">
                  Comece hoje mesmo a transformar seu celular em uma fonte de
                  renda. O guia completo está esperando por você.
                </Text>
              </div>
            </View.Item>

            <View.Item>
              <Link href="/lead">
                <Button size="large" fullWidth>
                  Fazer o download do guia agora
                </Button>
              </Link>
            </View.Item>

            <View.Item>
              <View direction="row" gap={2} align="center" justify="center">
                <View.Item>
                  <span
                    className="material-symbols-rounded"
                    style={{ fontSize: '20px' }}
                  >
                    schedule
                  </span>
                </View.Item>
                <View.Item>
                  <Text variant="caption-1" align="center">
                    Acesso imediato após o cadastro
                  </Text>
                </View.Item>
              </View>
            </View.Item>
          </View>
        </Card>
      </Container>
    </section>
  );
};
