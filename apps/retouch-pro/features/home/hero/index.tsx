'use client';

import { Icon, Heading, Button, Text } from '@t8pro/design-system';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useHero } from './hooks';
import styles from './styles.module.scss';

export const Hero = () => {
  const {
    handleFileSelect,
    handleClick,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    isDragOver,
    fileInputRef,
  } = useHero();
  const router = useRouter();

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div
          className={`${styles.heroContent} ${isDragOver ? styles.dragOver : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className={styles.contentFrame}>
            <svg
              className={styles.borderSvg}
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <rect
                width="100%"
                height="100%"
                fill="none"
                stroke="var(--color-secondary)"
                strokeWidth="2"
                strokeDasharray="16 16"
                rx="0"
                ry="0"
              />
            </svg>

            <Icon name="image" size={48} className={styles.heroIcon} />

            <Heading as="h1" className={styles.heroTitle} weight="bold">
              Transform your ordinary photos into professional photos.
            </Heading>

            <Link
              href="/#before-after"
              className={styles.secondaryLink}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'hero_examples_click', {
                    location: 'hero',
                  });
                }
                router.push('/#before-after');
              }}
            >
              See what&apos;s possible
            </Link>

            <Button
              type="button"
              size="large"
              variant="1"
              iconLeft="upload"
              onClick={e => {
                e.stopPropagation();
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'hero_cta_click', {
                    location: 'hero',
                  });
                }
                handleClick();
              }}
            >
              Select your photos
            </Button>

            <Text className={styles.heroSubtext}>
              {isDragOver
                ? 'Drop your photos here'
                : 'You can send up to 24 photos at once'}
            </Text>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={e => {
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'hero_dropzone_open', {
                  location: 'hero',
                });
              }
              handleFileSelect(e.target.files);
            }}
            className={styles.hiddenFileInput}
            aria-label="Select photos to upload"
          />
        </div>
      </div>
    </section>
  );
};
