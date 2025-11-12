'use client';

import React from 'react';
import { Container, View, Text, Card, Accordion } from 'reshaped';
import styles from './styles.module.scss';

const modules = [
  {
    title: 'Módulo 1: Fundamentos do UGC',
    content:
      'Entenda o que é User Generated Content, por que as marcas investem nisso e como você pode se posicionar no mercado.',
  },
  {
    title: 'Módulo 2: Equipamentos e Setup',
    content:
      'Aprenda a configurar seu celular para criar vídeos profissionais, iluminação básica e áudio de qualidade.',
  },
  {
    title: 'Módulo 3: Criação de Conteúdo',
    content:
      'Técnicas de gravação, edição no celular, storytelling e como criar vídeos que convertem para as marcas.',
  },
  {
    title: 'Módulo 4: Encontrando Marcas',
    content:
      'Estratégias para encontrar marcas, como fazer pitch profissional e construir um portfólio atrativo.',
  },
  {
    title: 'Módulo 5: Negociação e Preços',
    content:
      'Aprenda a precificar seu trabalho, negociar contratos e estabelecer relacionamentos duradouros com marcas.',
  },
  {
    title: 'Módulo 6: Escalando seu Negócio',
    content:
      'Como aumentar sua renda, trabalhar com múltiplas marcas e transformar UGC em uma carreira de sucesso.',
  },
];

export const Curriculum = () => {
  return (
    <section className={styles.curriculum}>
      <Container>
        <View gap={8} align="center">
          <View.Item>
            <Text variant="featured-2" weight="bold" as="h2" align="center">
              Conteúdo do Curso
            </Text>
          </View.Item>

          <View.Item>
            <Text variant="body-1" align="center">
              Um programa completo dividido em módulos práticos que vão do
              básico ao avançado, tudo pensado para você começar a ganhar
              dinheiro.
            </Text>
          </View.Item>

          <View.Item>
            <Card padding={0} className={styles.accordionCard}>
              <Accordion gap={4} iconSize={6}>
                {modules.map((module, index) => (
                  <React.Fragment key={index}>
                    <Accordion.Trigger>
                      <Text variant="featured-3" weight="medium">
                        {module.title}
                      </Text>
                    </Accordion.Trigger>
                    <Accordion.Content>
                      <View padding={4}>
                        <Text variant="body-2">{module.content}</Text>
                      </View>
                    </Accordion.Content>
                  </React.Fragment>
                ))}
              </Accordion>
            </Card>
          </View.Item>
        </View>
      </Container>
    </section>
  );
};
