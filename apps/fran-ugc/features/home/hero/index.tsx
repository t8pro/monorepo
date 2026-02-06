'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';
import { Button, Container } from 'reshaped';
import styles from './styles.module.scss';

export const Hero = () => {
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#' + id);
    }
  };

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
                alt="Assinatura de Francieli Azevedo - Criadora do curso UGC na Prática"
                width={266}
                height={61}
                className={styles.signature}
                priority
              />
            </div>

            <p className={styles.description}>
              Vou te mostrar um método descomplicado de criar vídeos com seu
              celular, enviar para marcas e ganhar dinheiro trabalhando de casa.
            </p>

            <div className={styles.buttons}>
              <Link
                href="https://pay.kiwify.com.br/offEio7"
                data-gtm-category="conversion"
                data-gtm-label="hero_cta_pricing"
              >
                <Button size="large" color="primary" variant="solid">
                  <strong>Quero Garantir Minha Vaga</strong>
                </Button>
              </Link>

              <Link
                href="#pricing"
                onClick={e => handleScroll(e, 'pricing')}
                data-gtm-category="engagement"
                data-gtm-label="hero_cta_pricing"
              >
                <Button size="large" variant="outline">
                  Saber mais
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
              <Image
                src="/signature-white.svg"
                alt="Assinatura de Francieli Azevedo"
                width={266}
                height={61}
                className={styles.signatureWhite}
              />
            </div>

            <Link
              href="https://www.instagram.com/byfranazevedo"
              target="_blank"
              className={styles.socialMedia}
            >
              <FaInstagram size={24} />
              <span>@byfranazevedo</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
