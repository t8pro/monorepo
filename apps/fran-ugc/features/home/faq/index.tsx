'use client';

import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { Container } from 'reshaped';
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const faqStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqStructuredData);
    script.id = 'faq-structured-data';
    
    // Remove existing script if present
    const existingScript = document.getElementById('faq-structured-data');
    if (existingScript) {
      existingScript.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('faq-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return (
    <section className={styles.faq} id="faq">
      <Container>
        <h2 className={styles.title}>Perguntas Frequentes</h2>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
            >
              <button
                className={styles.question}
                onClick={() => toggleFAQ(index)}
                type="button"
              >
                <span>{faq.question}</span>
                <FaChevronDown className={styles.icon} />
              </button>
              {openIndex === index && (
                <div className={styles.answer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <a href="#pricing" className={styles.ctaButton}>
            Começar Agora
          </a>
        </div>
      </Container>
    </section>
  );
};
