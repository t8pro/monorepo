'use client';

import { Button, Heading, Text } from '@t8pro/design-system';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import styles from './styles.module.scss';

function EbookDownloadContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const isValid = token !== null;

  const handleDownload = () => {
    const ebookUrl = '/ebook-free.pdf';
    const link = document.createElement('a');
    link.href = ebookUrl;
    link.download = '/ebook-free.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isValid) {
    return (
      <div className={styles.container}>
        <Heading as="h1" className={styles.title}>
          Invalid Link
        </Heading>
        <Text className={styles.message}>
          This download link is not valid or has expired.
        </Text>
        <Button
          variant="1"
          onClick={() => (window.location.href = '/')}
          className={styles.button}
        >
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Heading as="h1" className={styles.title}>
        📚 Your E-book is Ready!
      </Heading>

      <Text className={styles.message}>
        Click the button below to download your free e-book:
        <br />
        <strong>How Photos Can Improve Your Sales</strong>
      </Text>

      <Button
        variant="1"
        size="large"
        iconLeft="download"
        onClick={handleDownload}
        className={styles.downloadButton}
      >
        Download Free E-book
      </Button>

      <Text className={styles.footer}>
        Thank you for trusting us! If you have any questions, please contact us.
      </Text>
    </div>
  );
}

export default function EbookDownloadPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.container}>
          <Text>Loading...</Text>
        </div>
      }
    >
      <EbookDownloadContent />
    </Suspense>
  );
}
