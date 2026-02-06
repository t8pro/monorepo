'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button, Container } from 'reshaped';
import styles from './styles.module.scss';

const navLinks = [
  { label: 'Você quer ganhar?', href: '#problem' },
  { label: 'Como funciona?', href: '#solution' },
  { label: 'Conteúdo do curso', href: '#modules' },
  { label: 'Depoimentos', href: '#testimonials' },
  {
    label: 'Investimento',
    href: '#pricing',
    gtmCategory: 'engagement',
    gtmLabel: 'header_nav_pricing',
  },
  { label: 'Sobre mim', href: '#aboutme' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.container}>
          <Link
            href="/"
            className={styles.logo}
            aria-label="UGC na Prática - Página inicial"
          >
            <Image
              src="/logo.svg"
              alt="UGC na Prática - Logo"
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
                  onClick={e => {
                    handleScroll(e, link.href);
                    setIsMenuOpen(false);
                  }}
                  data-gtm-category={link.gtmCategory}
                  data-gtm-label={link.gtmLabel}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className={styles.headerActions}>
            <Link
              href="#pricing"
              className={styles.ctaButton}
              onClick={e => handleScroll(e, '#pricing')}
              data-gtm-category="engagement"
              data-gtm-label="header_cta_pricing"
            >
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
                {isMenuOpen ? (
                  <span className="material-symbols-rounded">close</span>
                ) : (
                  <span className="material-symbols-rounded">menu</span>
                )}
              </span>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};
