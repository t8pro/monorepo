import { Metadata } from 'next';
import { PrivacyPolicy } from '@/features/legal/privacy-policy';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: 'Política de Privacidade e LGPD - UGC na Prática',
  description:
    'Conheça nossa Política de Privacidade e como tratamos seus dados pessoais em conformidade com a LGPD.',
  alternates: {
    canonical: `${siteUrl}/politica-de-privacidade`,
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
