'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container } from 'reshaped';
import styles from './styles.module.scss';

export const AboutMe = () => {
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
    <section className={styles.aboutMe} id="aboutme">
      <Container>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>Quem é Francieli Azevedo?</h2>

            <div className={styles.bio}>
              <p>
                Oi! Eu sou a Francieli Azevedo, mãe, criadora de conteúdo UGC e
                uma mulher apaixonada por autenticidade, criatividade e pela
                vida simples com a minha família.
              </p>

              <p>
                Nascida em Pimenta Bueno, Rondônia e criada em Campo Grande /
                MS, sempre tive um olhar curioso para as pequenas coisas que
                contam grandes histórias. E hoje uso essa sensibilidade para
                ajudar marcas a se conectarem com pessoas reais, de forma
                verdadeira e emocional.
              </p>

              <p>
                Minha jornada começou muito antes do UGC. Sempre gostei de me
                cuidar,e essa relação comigo mesma se refletiu naturalmente no
                conteúdo que produzo. Como mãe, aprendi a valorizar o tempo, a
                praticidade e o que realmente importa. Por isso, trabalho com
                marcas que desejam mais do que publicidade: querem conexão. Me
                especializei em criar vídeos e fotos que parecem conversas, não
                anúncios. Conteúdos que geram confiança porque nascem da vida
                real.
              </p>

              <p>
                Com a experiência de ter guiado mais de 30 mentoradas, trago
                conhecimento validado para cada projeto. Essa vivência como
                mentora me permite ter uma visão estratégica aprofundada,
                garantindo conteúdos que não apenas engajam, mas conectam de
                verdade.
              </p>

              <p>
                Hoje, ajudo empresas a humanizarem sua comunicação através de
                UGC com naturalidade, presença e criatividade.E faço isso com
                muito carinho, porque acredito profundamente que histórias reais
                têm o poder de transformar negócios e aproximar pessoas. Vamos
                contar histórias que importam?
              </p>
            </div>

            <div className={styles.signature}>
              <Image
                src="/signature.svg"
                alt="Francieli Azevedo"
                width={200}
                height={50}
              />
            </div>
          </div>

          <div className={styles.imageContent}>
            <div className={styles.imageWrapper}>
              <Image
                src="/about-me.png"
                alt="Francieli Azevedo"
                width={400}
                height={500}
                className={styles.profileImage}
              />
            </div>
          </div>
        </div>

        <div className={styles.cta}>
          <Link
            href="#pricing"
            className={styles.ctaButton}
            onClick={e => handleScroll(e, 'pricing')}
          >
            Quero começar agora
          </Link>
        </div>
      </Container>
    </section>
  );
};
