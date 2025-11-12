'use client';

import { Button, Text, Container, View } from 'reshaped';
import Link from 'next/link';
import styles from './styles.module.scss';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <Container>
        <View className={styles.content}>
          <View.Item>
            <Text variant="featured-1" weight="bold" as="h1" className={styles.title}>
              Vou te mostrar um método descomplicado de criar vídeos com seu
              celular, enviar para marcas e ganhar dinheiro trabalhando de casa.
            </Text>
          </View.Item>

          <View.Item>
            <Text variant="body-1" className={styles.subtitle}>
              Descubra como transformar seu celular em uma máquina de ganhar
              dinheiro criando conteúdo autêntico para marcas.
            </Text>
          </View.Item>

          <View.Item>
            <Link href="/tell-me-more">
              <Button size="large" fullWidth>
                Fazer o download do guia
              </Button>
            </Link>
          </View.Item>

          <View.Item>
            <div className={styles.imagePlaceholder}>
              <span className="material-symbols-rounded" style={{ fontSize: '120px' }}>
                videocam
              </span>
              <Text variant="caption-1" className={styles.placeholderText}>
                Imagem do curso será adicionada aqui
              </Text>
            </div>
          </View.Item>
        </View>
      </Container>
    </section>
  );
};

