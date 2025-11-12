'use client';

import React from 'react';
import { Container, View, Text, Card, Accordion } from 'reshaped';
import styles from './styles.module.scss';

const faqs = [
  {
    question: 'Preciso ter experiência prévia para fazer o curso?',
    answer:
      'Não! O curso foi desenvolvido para iniciantes. Você vai aprender tudo do zero, desde como configurar seu celular até como negociar com marcas.',
  },
  {
    question: 'Quanto tempo leva para ver resultados?',
    answer:
      'Muitos alunos começam a ver resultados nas primeiras semanas após aplicar as técnicas ensinadas. O tempo varia conforme seu empenho e dedicação.',
  },
  {
    question: 'Preciso de equipamentos caros?',
    answer:
      'Não! O curso ensina como criar conteúdo profissional usando apenas o celular que você já tem. Não é necessário investir em equipamentos caros.',
  },
  {
    question: 'Como funciona a garantia?',
    answer:
      'Você tem 7 dias para testar o curso. Se não ficar satisfeito, devolvemos 100% do seu dinheiro, sem perguntas.',
  },
  {
    question: 'Tenho acesso vitalício ao conteúdo?',
    answer:
      'Sim! Uma vez adquirido, você tem acesso vitalício a todo o conteúdo do curso e futuras atualizações.',
  },
  {
    question: 'O curso funciona para qualquer nicho?',
    answer:
      'Sim! As técnicas ensinadas são universais e podem ser aplicadas em qualquer nicho: moda, beleza, tecnologia, alimentação, etc.',
  },
];

export const FAQ = () => {
  return (
    <section className={styles.faq}>
      <Container>
        <View gap={8} align="center">
          <View.Item>
            <Text variant="featured-2" weight="bold" as="h2" align="center">
              Perguntas Frequentes
            </Text>
          </View.Item>

          <View.Item>
            <Card padding={0} className={styles.faqCard}>
              <Accordion gap={4} iconSize={6}>
                {faqs.map((faq, index) => (
                  <React.Fragment key={index}>
                    <Accordion.Trigger>
                      <Text variant="featured-3" weight="medium">
                        {faq.question}
                      </Text>
                    </Accordion.Trigger>
                    <Accordion.Content>
                      <View padding={4}>
                        <Text variant="body-2">{faq.answer}</Text>
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
