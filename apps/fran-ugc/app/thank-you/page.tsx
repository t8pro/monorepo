import { Metadata } from 'next';
import { Container } from 'reshaped';
import { EmptyState } from '@/components/empty-state';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://francieliazevedo.com/ugc';

export const metadata: Metadata = {
  title: 'Obrigado!',
  description:
    'Recebemos suas informações. Em breve você receberá o guia por email.',
  alternates: {
    canonical: `${siteUrl}/thank-you`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <Container>
      <EmptyState
        title="Obrigado!"
        description="Recebemos suas informações. Em breve você receberá o guia por email."
        icon={
          <span
            className="material-symbols-rounded"
            style={{ fontSize: '64px', color: '#22c55e' }}
          >
            check_circle
          </span>
        }
        action={{
          href: '/',
          label: 'Voltar para a página inicial',
          size: 'large',
        }}
      />
    </Container>
  );
}
