'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container } from 'reshaped';
import styles from './styles.module.scss';

const navLinks = [
  { label: 'Você quer ganhar?', href: '#problem' },
  { label: 'Como funciona?', href: '#solution' },
  { label: 'Conteúdo do curso', href: '#curriculum' },
  { label: 'Investimento', href: '#pricing' },
  { label: 'Sobre mim', href: '#testimonials' },
];

export const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.container}>
          <Link href="/" className={styles.logo} aria-label="UGC em Prática - Página inicial">
            <Image 
              src="/logo.svg" 
              alt="UGC em Prática - Logo" 
              width={32} 
              height={22} 
              priority 
            />
          </Link>

          <nav className={styles.nav}>
            <div className={styles.links}>
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>

            <Link href="#pricing" className={styles.cta}>
              Ver Cupons
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
};
