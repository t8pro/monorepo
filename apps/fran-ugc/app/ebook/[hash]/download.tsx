'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface DownloadProps {
  ebookPath: string;
}

export function Download({ ebookPath }: DownloadProps) {
  const router = useRouter();

  useEffect(() => {
    // Force download of PDF
    const link = document.createElement('a');
    link.href = ebookPath;
    link.download = 'guia-ugc-gratuito.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Redirect to thank you page after a short delay
    setTimeout(() => {
      router.push('/ebook/thank-you');
    }, 1000);
  }, [ebookPath, router]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fbf8f4',
        fontFamily: 'var(--font-figtree), sans-serif',
      }}
    >
      <p style={{ color: '#914326', fontSize: '18px' }}>
        Iniciando download...
      </p>
    </div>
  );
}
