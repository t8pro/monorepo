import { Metadata } from 'next';
import Link from 'next/link';
import { Container, Button } from 'reshaped';
import styles from './styles.module.scss';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: 'Obrigado! - Download do E-book',
  description: 'Obrigado por baixar o guia gratuito de UGC!',
  alternates: {
    canonical: `${siteUrl}/ebook/thank-you`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function EbookThankYouPage() {
  return (
    <>
      <section className={styles.thankYouSection}>
        <Container>
          <div className={styles.content}>
            <div className={styles.icon}>
              <span className="material-symbols-rounded">check_circle</span>
            </div>
            <h1 className={styles.title}>Obrigado!</h1>
            <p className={styles.description}>
              Seu download foi iniciado com sucesso! Esperamos que o guia te
              ajude a começar sua jornada no mundo do UGC.
            </p>
            <p className={styles.subDescription}>
              Agora que você já tem o guia gratuito, que tal fazer parte do
              curso completo e transformar seu celular em uma fonte de renda?
            </p>
            <Link
              href="https://pay.kiwify.com.br/offEio7"
              className={styles.ctaLink}
              data-gtm-category="conversion"
              data-gtm-label="ebook_thank_you_cta_pricing"
            >
              <Button size="large" color="primary" variant="solid">
                Quero fazer parte do curso
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
