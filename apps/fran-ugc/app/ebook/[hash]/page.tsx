import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Download } from './download';
import { validateEbookHash } from '@/lib/ebook-hash';

export const metadata: Metadata = {
  title: 'Download do E-book',
  robots: {
    index: false,
    follow: false,
  },
};

interface EbookPageProps {
  params: Promise<{
    hash: string;
  }>;
}

export default async function EbookPage({ params }: EbookPageProps) {
  const { hash } = await params;

  // Validate hash
  const isValid = validateEbookHash(hash);

  if (!isValid) {
    // Hash is invalid, redirect to home
    redirect('/');
  }

  // Hash is valid, trigger download and redirect
  const ebookPath = '/api/ebook/download';

  return <Download ebookPath={ebookPath} />;
}
