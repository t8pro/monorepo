'use client';

import Image from 'next/image';
import { Container } from 'reshaped';
import styles from './styles.module.scss';

export const Testimonials = () => {
  return (
    <section className={styles.testimonials} id="testimonials">
      <Container>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>Quem é Franciele Azevedo?</h2>

            <div className={styles.bio}>
              <p>
                Sou criadora de conteúdo especializada em UGC (User Generated
                Content) e ajudo pessoas a transformarem seus celulares em uma
                verdadeira fonte de renda.
              </p>

              <p>
                Com anos de experiência trabalhando com marcas nacionais e
                internacionais, desenvolvi um método descomplicado que ensina
                qualquer pessoa a criar vídeos profissionais e lucrativos.
              </p>

              <p>
                Já ajudei centenas de alunos a darem seus primeiros passos no
                mundo do UGC, e muitos deles já estão faturando todos os meses
                criando conteúdo autêntico para marcas.
              </p>

              <p>
                Minha missão é democratizar o acesso ao mercado de UGC e mostrar
                que você não precisa de seguidores, equipamentos caros ou
                experiência prévia para começar a ganhar dinheiro criando
                conteúdo.
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
                alt="Franciele Azevedo"
                width={400}
                height={500}
                className={styles.profileImage}
              />
            </div>
          </div>
        </div>

        <div className={styles.cta}>
          <a href="#pricing" className={styles.ctaButton}>
            Quero começar agora
          </a>
        </div>
      </Container>
    </section>
  );
};
