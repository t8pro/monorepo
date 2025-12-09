'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Container } from 'reshaped';

import styles from './styles.module.scss';

export const EbookGuide = () => {
  return (
    <section className={styles.ebookGuide} id="ebookGuide">
      <Container>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>
              Ainda não se sente <br /> confiante para começar?
            </h2>

            <p className={styles.description}>
              Baixe o meu guia grátis que já vai te ensinar o básico e te deixar
              com mais confiança para seguir neste mercado
            </p>

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
            <div className={styles.imageWrapper}>
              <Image
                src="/ebook-image.png"
                alt="Guia Prático UGC - E-book completo sobre como criar vídeos UGC e ganhar dinheiro"
                width={600}
                height={750}
                className={styles.ebookImage}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
