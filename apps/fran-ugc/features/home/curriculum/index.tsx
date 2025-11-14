'use client';

import Link from 'next/link';
import React from 'react';
import { Container } from 'reshaped';

import styles from './styles.module.scss';

const modules = [
  {
    title: 'Módulo 1: Fundamentos do UGC',
    description:
      'Entenda o que é User Generated Content, por que as marcas investem nisso e como você pode se posicionar no mercado.',
  },
  {
    title: 'Módulo 2: Equipamentos e Setup',
    description:
      'Aprenda a configurar seu celular para criar vídeos profissionais, iluminação básica e áudio de qualidade.',
  },
  {
    title: 'Módulo 3: Criação de Conteúdo',
    description:
      'Técnicas de gravação, edição no celular, storytelling e como criar vídeos que convertem para as marcas.',
  },
  {
    title: 'Módulo 4: Encontrando Marcas',
    description:
      'Estratégias para encontrar marcas, como fazer pitch profissional e construir um portfólio atrativo.',
  },
  {
    title: 'Módulo 5: Negociação e Preços',
    description:
      'Aprenda a precificar seu trabalho, negociar contratos e estabelecer relacionamentos duradouros com marcas.',
  },
  {
    title: 'Módulo 6: Escalando seu Negócio',
    description:
      'Como aumentar sua renda, trabalhar com múltiplas marcas e transformar UGC em uma carreira de sucesso.',
  },
];

export const Curriculum = () => {
  return (
    <section className={styles.curriculum} id="curriculum">
      <Container>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>
              Ainda não existe conteúdo para começar?
            </h2>

            <p className={styles.description}>
              Criamos um guia completo e gratuito para você dar os primeiros
              passos no mundo do UGC. Baixe agora e descubra como começar a
              ganhar dinheiro criando vídeos com seu celular.
            </p>

            <div className={styles.modules}>
              {modules.map((module, index) => (
                <div key={index} className={styles.module}>
                  <div className={styles.moduleNumber}>{index + 1}</div>
                  <div className={styles.moduleContent}>
                    <h3 className={styles.moduleTitle}>{module.title}</h3>
                    <p className={styles.moduleDescription}>
                      {module.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.cta}>
              <Link
                href="/lead"
                className={styles.ctaButton}
                aria-label="Baixar guia gratuito de UGC"
              >
                Baixar guia gratuito
              </Link>
            </div>
          </div>

          <div className={styles.imageContent}>
            <div className={styles.bookPlaceholder}>
              <span className="material-symbols-rounded">menu_book</span>
              <p>Guia Prático UGC</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
