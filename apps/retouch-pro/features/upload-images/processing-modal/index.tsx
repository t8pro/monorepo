'use client';

import {
  Button,
  Card,
  Heading,
  Icon,
  IconName,
  Text,
} from '@t8pro/design-system';
import { usePhotosContext } from '../context';
import styles from './styles.module.scss';

export const ProcessingModal = () => {
  const { isProcessingPhotos, processingStep, processingMessage, error } =
    usePhotosContext();

  if (!isProcessingPhotos) return null;

  const getStepIcon = (step: string): IconName => {
    switch (step) {
      case 'compressing':
        return 'compress';
      case 'uploading':
        return 'cloud_upload';
      case 'sending_email':
        return 'mail';
      case 'completed':
        return 'check_circle';
      default:
        return 'hourglass_empty';
    }
  };

  const getStepTitle = (step: string) => {
    switch (step) {
      case 'compressing':
        return 'Compressing Images';
      case 'uploading':
        return 'Uploading Photos';
      case 'sending_email':
        return 'Sending Email';
      case 'completed':
        return 'Processing Complete';
      default:
        return 'Processing';
    }
  };

  const isCompleted = processingStep === 'completed';

  return (
    <div className={styles.overlay}>
      <Card className={styles.modal}>
        <div className={styles.content}>
          <div className={styles.iconContainer}>
            <Icon
              name={getStepIcon(processingStep)}
              size={48}
              className={
                isCompleted ? styles.successIcon : styles.processingIcon
              }
            />
          </div>

          <Heading as="h2" size="xl" weight="bold" className={styles.title}>
            {getStepTitle(processingStep)}
          </Heading>

          <Text size="lg" className={styles.message}>
            {processingMessage || 'Please wait while we process your photos...'}
          </Text>

          {!isCompleted && (
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} />
              </div>
            </div>
          )}

          {error && (
            <div className={styles.errorContainer}>
              <Text size="sm" className={styles.errorText}>
                {error}
              </Text>
            </div>
          )}

          {isCompleted && (
            <Button
              variant="2"
              size="large"
              iconLeft="check_circle"
              className={styles.completeButton}
              onClick={() => (window.location.href = '/upload/thank-you')}
            >
              View Results
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
