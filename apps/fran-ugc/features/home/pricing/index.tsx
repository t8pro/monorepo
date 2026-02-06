'use client';

import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';
import { Container } from 'reshaped';
import styles from './styles.module.scss';

const benefits = [
  'Atualizações gratuitas do conteúdo',
  'Módulos práticos e diretos',
  'Lista de marcas que contratam UGC',
  'Grupo exclusivo de alunos',
  'Suporte',
];

export const Pricing = () => {
  return (
    <section className={styles.pricing} id="pricing">
      <Container>
        <div className={styles.darkSection}>
          <div className={styles.content}>
            <h2 className={styles.title}>Pronto para Começar a Ganhar?</h2>

            <div className={styles.priceCard}>
              <div className={styles.badge}>Oferta de Lançamento</div>

              <div className={styles.originalPrice}>
                <span>De R$ 397,00 por apenas</span>
              </div>
              <div className={styles.priceWrapper}>
                <span className={styles.currency}>R$</span>
                <span className={styles.price}>97,00</span>
              </div>

              <p className={styles.installments}>em até 12x no cartão</p>

              <div className={styles.benefits}>
                <h3 className={styles.benefitsTitle}>
                  O que você vai receber:
                </h3>
                <ul className={styles.benefitsList}>
                  {benefits.map((benefit, index) => (
                    <li key={index}>
                      <FaCheck />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="https://pay.kiwify.com.br/offEio7"
                className={styles.ctaButton}
                data-gtm-category="conversion"
                data-gtm-label="pricing_checkout"
                data-gtm-action="checkout_start"
              >
                Garantir Minha Vaga Agora
              </Link>

              <div className={styles.guarantee}>
                <FaCheck />
                <span>Garantia de 7 dias ou seu dinheiro de volta</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
