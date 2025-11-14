import { Metadata } from 'next';
import { LeadSuccess } from '@/features/lead/success';

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
  return <LeadSuccess />;
}
