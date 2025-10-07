'use client';

import { Heading, Icon, Text } from '@t8pro/design-system';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import styles from './styles.module.scss';
import { PENDING_UPLOAD_STORAGE_KEY } from '@/features/upload-images/context/constants';
import type { PendingUploadPayload } from '@/features/upload-images/context/types';

const infoCards = [
  {
    icon: 'cloud_upload',
    title: 'Uploading Your Photos',
    highlight: 'This takes just a moment',
    description:
      'We are securely transferring your files to our retouching team and logging them against your order.',
  },
  {
    icon: 'schedule',
    title: 'Production Timeline',
    highlight: 'Delivery within 48 hours',
    description:
      'Most paid orders are completed in two business days. Need it sooner? Reply to the confirmation email and let us know.',
  },
  {
    icon: 'support_agent',
    title: 'Need Anything Else?',
    highlight: 'We are here to help',
    description:
      'Share references, request tweaks, or ask questions at any time. Our specialists will follow up quickly.',
  },
] as const;

export const UploadPaidThankYou = () => {
  const [pendingUpload, setPendingUpload] =
    useState<PendingUploadPayload | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'uploading' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const loadPendingUpload = async () => {
      // Load metadata from sessionStorage and photos from IndexedDB
      const stored = sessionStorage.getItem(PENDING_UPLOAD_STORAGE_KEY);
      if (!stored) {
        return;
      }

      let pendingUpload: PendingUploadPayload | null = null;
      try {
        const metadata = JSON.parse(stored);

        // Load photos from IndexedDB
        const { photoStorage } = await import(
          '@/features/upload-images/context/utils/photo-storage'
        );
        const photos = await photoStorage.loadPhotos();

        // Reconstruct pendingUpload with photos from IndexedDB
        pendingUpload = {
          amount: metadata.amount,
          currency: metadata.currency,
          packageType: metadata.packageType,
          photoCount: metadata.photoCount,
          createdAt: metadata.createdAt,
          photos: photos.map(photo => ({
            name: photo.name,
            type: photo.type,
            size: photo.size,
            width: photo.width,
            height: photo.height,
            dataUrl: photo.preview, // Use preview as dataUrl
          })),
        };
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load pending upload data:', error);
        return;
      }

      if (!pendingUpload) {
        return;
      }

      try {
        const parsed = pendingUpload;
        setPendingUpload(parsed);
        const controller = new AbortController();

        const uploadPhotos = async () => {
          setUploadStatus('uploading');
        };

        void uploadPhotos();

        return () => {
          controller.abort();
        };
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'We could not resume your upload. Please contact support.',
        );
        setUploadStatus('error');
      }
    };

    void loadPendingUpload();
  }, []);

  const statusMessage = useMemo(() => {
    if (!pendingUpload) {
      return null;
    }

    switch (uploadStatus) {
      case 'uploading':
        return `Sending ${pendingUpload.photoCount} photos to our API...`;
      case 'success':
        return `Your ${pendingUpload.photoCount} photos were sent successfully.`;
      case 'error':
        return errorMessage;
      default:
        return null;
    }
  }, [pendingUpload, uploadStatus, errorMessage]);

  const statusClassName = useMemo(() => {
    if (uploadStatus === 'error') {
      return `${styles.statusMessage} ${styles.statusMessageError}`;
    }

    return styles.statusMessage;
  }, [uploadStatus]);

  return (
    <section className={styles.thankYou}>
      <div className={styles.container}>
        <Heading as="h1" size="3xl" weight="bold" className={styles.title}>
          Thank you for your order!
        </Heading>
        <Text size="lg" className={styles.subtitle}>
          Your payment was confirmed and your photos are already in our
          retouching queue. We will keep you updated by email and let you know
          the moment everything is ready to download.
        </Text>

        {pendingUpload && (
          <div className={styles.summary}>
            <Text className={styles.summaryTitle}>Order summary</Text>
            <Text size="sm" className={styles.summaryDetail}>
              {pendingUpload.photoCount} photos · Package:{' '}
              {pendingUpload.packageType}
              {' · '}Total: ${pendingUpload.amount.toFixed(0)}
            </Text>
          </div>
        )}

        {statusMessage && (
          <Text size="sm" className={statusClassName}>
            {statusMessage}
          </Text>
        )}

        <div className={styles.infoGrid}>
          {infoCards.map(card => (
            <div key={card.title} className={styles.card}>
              <div className={styles.cardIcon}>
                <Icon name={card.icon} size={28} />
              </div>
              <Heading
                as="h2"
                size="lg"
                weight="semibold"
                className={styles.cardTitle}
              >
                {card.title}
              </Heading>
              <Text className={styles.cardHighlight}>{card.highlight}</Text>
              <Text size="sm" className={styles.cardDescription}>
                {card.description}
              </Text>
            </div>
          ))}
        </div>
        <div className={styles.social}>
          <Text className={styles.socialPrompt}>Need support?</Text>
          <Link href="mailto:contact@t8pro.com" className={styles.socialLink}>
            <Icon name="support_agent" size={20} />
            contact@t8pro.com
          </Link>
        </div>
      </div>
    </section>
  );
};
