'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { Container } from 'reshaped';
import styles from './styles.module.scss';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <div className={styles.brand}>
            <Image
              src="/logo.svg"
              alt="UGC na Prática - Logo"
              width={32}
              height={22}
              loading="lazy"
            />
            <p className={styles.tagline}>
              Transforme seu celular <br /> em uma fonte de renda
            </p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Navegação</h3>
              <Link href="/#problem" className={styles.link}>
                Você quer ganhar?
              </Link>
              <Link href="/#solution" className={styles.link}>
                Como funciona?
              </Link>
              <Link href="/#modules" className={styles.link}>
                Conteúdo do curso
              </Link>
              <Link href="/#pricing" className={styles.link}>
                Investimento
              </Link>
            </div>

            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Suporte</h3>
              <Link href="/#faq" className={styles.link}>
                Perguntas Frequentes
              </Link>
              <Link href="/#aboutme" className={styles.link}>
                Sobre mim
              </Link>
            </div>

            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Redes Sociais</h3>
              <a
                href="https://instagram.com/byfranazevedo"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className={styles.socialLink}
                aria-label="Instagram de Francieli Azevedo - Abre em nova aba"
              >
                <FaInstagram size={20} />
                <span>@byfranazevedo</span>
              </a>
            </div>

            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Contato</h3>
              <a
                href="https://wa.me/+5567998777776"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="WhatsApp - Abre em nova aba"
              >
                <FaWhatsapp size={20} />
                <span>+55 67 99877-7776</span>
              </a>
              <a
                href="mailto:contato@francieliazevedo.com"
                className={styles.socialLink}
                aria-label="Enviar email"
              >
                <FaEnvelope size={20} />
                <span>contato@francieliazevedo.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} UGC na Prática. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
};
