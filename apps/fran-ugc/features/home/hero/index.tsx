'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';
import { Button, Container } from 'reshaped';
import styles from './styles.module.scss';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>UGC na Prática </h1>

            <h2 className={styles.subtitle}>
              Trabalhe no seu próprio ritmo: <br />
              ganhe criando conteúdo de casa
            </h2>

            <div className={styles.author}>
              <span className={styles.authorLabel}>por:</span>
              <Image
                src="/signature.svg"
                alt="Assinatura de Francieli Azevedo - Criadora do curso UGC em Prática"
                width={266}
                height={61}
                className={styles.signature}
                loading="lazy"
              />
            </div>

            <p className={styles.description}>
              Vou te mostrar um método descomplicado de criar vídeos com seu
              celular, enviar para marcas e ganhar dinheiro trabalhando de casa.
            </p>

            <div className={styles.buttons}>
              <Link href="#pricing">
                <Button size="large" color="primary" variant="solid">
                  Quero Garantir Minha Vaga
                </Button>
              </Link>

              <Link href="#testimonials">
                <Button size="large" variant="outline">
                  Sobre mim
                </Button>
              </Link>
            </div>
          </div>

          <div className={styles.imageContent}>
            <div className={styles.imageWrapper}>
              <Image
                src="/hero-image.png"
                alt="Francieli Azevedo - Especialista em UGC ensinando como criar vídeos profissionais com celular e ganhar dinheiro trabalhando de casa"
                width={547}
                height={384}
                className={styles.heroImage}
                priority
                loading="eager"
              />
              <div className={styles.signatureOverlay}>
                <Image
                  src="/signature-white.svg"
                  alt="Assinatura de Francieli Azevedo"
                  width={266}
                  height={61}
                  className={styles.signatureWhite}
                />
              </div>
            </div>

            <div className={styles.socialMedia}>
              <FaInstagram size={24} />
              <span>@franazevedougc</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
