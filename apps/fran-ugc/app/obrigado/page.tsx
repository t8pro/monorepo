import { Metadata } from 'next';
import { PurchaseSuccess } from '@/features/course/purchase-success';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: 'Obrigado pela sua compra! - UGC na Pr�tica',
  description:
    'Parabéns pela compra do curso UGC na Prática! Verifique seu e-mail para receber as credenciais de acesso à plataforma.',
  alternates: {
    canonical: `${siteUrl}/obrigado`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return <PurchaseSuccess />;
}
