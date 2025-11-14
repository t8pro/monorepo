'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Container } from 'reshaped';
import styles from './styles.module.scss';

const navLinks = [
  { label: 'Você quer ganhar?', href: '#problem' },
  { label: 'Como funciona?', href: '#solution' },
  { label: 'Conteúdo do curso', href: '#curriculum' },
  { label: 'Investimento', href: '#pricing' },
  { label: 'Sobre mim', href: '#testimonials' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.container}>
          <Link
            href="/"
            className={styles.logo}
            aria-label="UGC em Prática - Página inicial"
          >
            <Image
              src="/logo.svg"
              alt="UGC em Prática - Logo"
              width={32}
              height={22}
              priority
            />
          </Link>

          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
            <div className={styles.links}>
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.link}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className={styles.headerActions}>
            <Link href="#pricing" className={styles.ctaButton}>
              <Button size="large" color="primary" variant="solid">
                Inscreva-se
              </Button>
            </Link>

            <button
              type="button"
              className={styles.menuToggle}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMenuOpen}
            >
              <span className={styles.menuIcon}>
                {isMenuOpen ? '✕' : '☰'}
              </span>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};
