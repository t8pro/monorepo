/* eslint-disable no-console */
'use client';

import { createContext, useCallback, useContext, useReducer } from 'react';
import { toast } from 'react-toastify';
import { INITIAL_STATE, PENDING_UPLOAD_STORAGE_KEY } from './constants';
import {
  PendingUploadPayload,
  PaymentData,
  Photo,
  PhotoContextValues,
  PhotoProviderProps,
  UserData,
} from './types';
import { processPhotoForUpload } from './utils/image';
import { photoReducer } from './utils/photo-reducer';
import { photoStorage } from './utils/photo-storage';

const PhotoContext = createContext<PhotoContextValues>(
  {} as PhotoContextValues,
);

const MAX_FREE_PACKAGE = 5;
const MAX_PHOTOS_LIMIT = 24;

const getPackageDetails = (selectedCount: number) => {
  if (selectedCount === 0) {
    return null;
  }

  if (selectedCount <= MAX_FREE_PACKAGE) {
    return {
      name: 'No Package',
      unitPrice: 15,
      totalPrice: selectedCount * 15,
      discountedPrice: selectedCount * 15,
    } as const;
  }

  if (selectedCount <= 11) {
    return {
      name: 'Quick Fix',
      unitPrice: 10,
      totalPrice: selectedCount * 15,
      discountedPrice: selectedCount * 10,
    } as const;
  }

  if (selectedCount <= 23) {
    return {
      name: 'Growth Accelerator',
      unitPrice: 8.33,
      totalPrice: selectedCount * 15,
      discountedPrice: selectedCount * 8.33,
    } as const;
  }

  return {
    name: 'Premium',
    unitPrice: 6,
    totalPrice: selectedCount * 15,
    discountedPrice: selectedCount * 6,
  } as const;
};

const buildPendingUploadPayload = async (
  photos: Photo[],
  packageName: string,
  amount: number,
  currency: string,
  onProgress?: (progress: number) => void,
): Promise<PendingUploadPayload> => {
  const photoCount = photos.length;
  const photoPayloads = [];
  const baseProgress = 10;
  const progressRange = 45;

  for (let index = 0; index < photoCount; index += 1) {
    const photo = photos[index];
    if (!photo) {
      continue;
    }

    // Store only metadata, not the actual image data
    photoPayloads.push({
      name: photo.name,
      type: photo.type,
      size: photo.size,
      width: photo.width,
      height: photo.height,
      // Remove dataUrl to prevent localStorage quota exceeded
      dataUrl: '',
    });

    if (onProgress) {
      const progress = Math.round(
        baseProgress + ((index + 1) / photoCount) * progressRange,
      );
      onProgress(progress);
    }
  }

  return {
    amount,
    currency,
    packageType: packageName,
    photoCount,
    photos: photoPayloads,
    createdAt: new Date().toISOString(),
  };
};

export const PhotoProvider = ({ children }: PhotoProviderProps) => {
  const [state, dispatch] = useReducer(photoReducer, INITIAL_STATE);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
    if (error) {
      toast.error(error);
    }
  }, []);

  const setUserData = useCallback((userData: UserData) => {
    dispatch({ type: 'SET_USER_DATA', payload: userData });
    // Save to storage whenever user data changes
    if (typeof window !== 'undefined') {
      photoStorage.saveUserData(userData);
    }
  }, []);

  const setUploading = useCallback((isUploading: boolean) => {
    dispatch({ type: 'SET_UPLOADING', payload: isUploading });
  }, []);

  const setUploadProgress = useCallback((progress: number) => {
    dispatch({ type: 'SET_UPLOAD_PROGRESS', payload: progress });
  }, []);

  const setProcessingPayment = useCallback((isProcessing: boolean) => {
    dispatch({ type: 'SET_PROCESSING_PAYMENT', payload: isProcessing });
  }, []);

  const addPhotos = useCallback(
    (files: File[]) => {
      if (!files.length) {
        return;
      }

      // Check if adding these files would exceed the limit
      const currentPhotoCount = state.photos.length;
      const newPhotoCount = files.length;
      const totalAfterAdd = currentPhotoCount + newPhotoCount;

      if (totalAfterAdd > MAX_PHOTOS_LIMIT) {
        const remainingSlots = MAX_PHOTOS_LIMIT - currentPhotoCount;
        if (remainingSlots <= 0) {
          setError(
            `You can only upload up to ${MAX_PHOTOS_LIMIT} photos. Please remove some photos before adding new ones.`,
          );
          return;
        }

        setError(
          `You can only upload up to ${MAX_PHOTOS_LIMIT} photos. You can add ${remainingSlots} more photo${remainingSlots === 1 ? '' : 's'}.`,
        );
        return;
      }

      void (async () => {
        try {
          setError(null);
          const processedPhotos: Photo[] = [];

          for (let index = 0; index < files.length; index += 1) {
            const originalFile = files[index];
            if (!originalFile) {
              continue;
            }
            const { file, width, height } =
              await processPhotoForUpload(originalFile);

            processedPhotos.push({
              id: crypto.randomUUID(),
              file,
              preview: URL.createObjectURL(file),
              name: file.name,
              size: file.size,
              type: file.type,
              width,
              height,
            });
          }

          dispatch({ type: 'ADD_PHOTOS', payload: processedPhotos });
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : 'We could not process the selected files. Please try again.',
          );
        }
      })();
    },
    [setError, state.photos.length],
  );

  const restorePhotosFromStorage = useCallback(async () => {
    if (typeof window === 'undefined') return;

    try {
      // Restore photos
      const restoredPhotos = await photoStorage.loadPhotos();
      if (restoredPhotos.length > 0) {
        // Replace existing photos with restored ones
        dispatch({ type: 'SET_PHOTOS', payload: restoredPhotos });
      }

      // Restore user data
      const restoredUserData = await photoStorage.loadUserData();
      if (restoredUserData) {
        dispatch({ type: 'SET_USER_DATA', payload: restoredUserData });
      }
    } catch {
      // Silently fail if restoration doesn't work
    }
  }, []);

  const removePhoto = useCallback(
    (id: string) => {
      const target = state.photos.find(photo => photo.id === id);
      if (target) {
        URL.revokeObjectURL(target.preview);
      }

      dispatch({ type: 'REMOVE_PHOTO', payload: id });
    },
    [state.photos],
  );

  const clearPhotos = useCallback(() => {
    state.photos.forEach(photo => {
      URL.revokeObjectURL(photo.preview);
    });
    dispatch({ type: 'CLEAR_PHOTOS' });
    // Also clear user data when clearing photos
    if (typeof window !== 'undefined') {
      photoStorage.clearUserData();
    }
  }, [state.photos]);

  const setProcessingPhotos = useCallback((isProcessing: boolean) => {
    dispatch({ type: 'SET_PROCESSING_PHOTOS', payload: isProcessing });
  }, []);

  const setProcessingStep = useCallback(
    (
      step:
        | 'idle'
        | 'compressing'
        | 'uploading'
        | 'sending_email'
        | 'completed',
      message?: string,
    ) => {
      dispatch({ type: 'SET_PROCESSING_STEP', payload: { step, message } });
    },
    [],
  );

  const sendOrderEmail = useCallback(
    async (
      packageInfo: { name: string; discountedPrice: number },
      userData: UserData,
      photos: Photo[],
      folderLink?: string,
    ) => {
      try {
        console.log('sendOrderEmail: Starting...', {
          packageInfo,
          userData,
          photosCount: photos.length,
        });
        const formData = new FormData();

        // Add user data
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('environment', userData.environment);
        formData.append('packageType', packageInfo.name);
        formData.append('totalAmount', packageInfo.discountedPrice.toString());
        formData.append('photoCount', photos.length.toString());

        // Add photo files
        photos.forEach((photo, index) => {
          formData.append(`photo_${index}`, photo.file);
        });

        if (folderLink) {
          formData.append('folderLink', folderLink);
        }

        console.log('sendOrderEmail: Sending request to API...');
        const response = await fetch('/api/send-order-email', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          console.error(
            'sendOrderEmail: API request failed:',
            response.status,
            response.statusText,
          );
          throw new Error('Failed to send order email');
        }

        console.log('sendOrderEmail: Email sent successfully');
        return await response.json();
      } catch (error) {
        console.error('sendOrderEmail: Error:', error);
        throw error instanceof Error
          ? error
          : new Error('Failed to send order email');
      }
    },
    [],
  );

  const processPayment = useCallback(
    async (paymentData: PaymentData) => {
      try {
        // Save photos and user data to storage before payment
        if (typeof window !== 'undefined') {
          await photoStorage.savePhotos(state.photos);
          await photoStorage.saveUserData(state.userData);
        }

        const response = await fetch('/api/payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: paymentData.amount,
            currency: paymentData.currency,
            packageType: paymentData.packageType,
            photoCount: paymentData.photoCount,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const { clientSecret } = await response.json();
        dispatch({ type: 'OPEN_CHECKOUT', payload: clientSecret });
      } catch (error) {
        throw error instanceof Error
          ? error
          : new Error('Payment failed. Please try again.');
      }
    },
    [state.photos, state.userData],
  );

  const finalizeOrder = useCallback(() => {
    const selectedCount = state.photos.length;
    const packageInfo = getPackageDetails(selectedCount);

    if (!packageInfo) {
      setError('Select at least one photo before continuing.');
      return;
    }

    // Validate user data
    if (!state.userData.name.trim()) {
      setError('Please enter your name before proceeding.');
      return;
    }

    if (!state.userData.email.trim()) {
      setError('Please enter your email before proceeding.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.userData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate environment selection
    if (!state.userData.environment) {
      setError('Please select your preferred environment.');
      return;
    }

    void (async () => {
      try {
        setUploading(true);
        setError(null);
        setUploadProgress(5);

        const pendingUpload = await buildPendingUploadPayload(
          state.photos,
          packageInfo.name,
          packageInfo.discountedPrice,
          'USD',
          setUploadProgress,
        );

        if (typeof window !== 'undefined') {
          // Store photos in IndexedDB (they're already there from savePhotos)
          // Store only metadata in sessionStorage for middleware
          const metadataForMiddleware = {
            amount: pendingUpload.amount,
            currency: pendingUpload.currency,
            packageType: pendingUpload.packageType,
            photoCount: pendingUpload.photoCount,
            createdAt: pendingUpload.createdAt,
            // Store only photo IDs, not the actual data
            photoIds: pendingUpload.photos.map(photo => photo.name), // Use name as ID reference
          };

          try {
            sessionStorage.setItem(
              PENDING_UPLOAD_STORAGE_KEY,
              JSON.stringify(metadataForMiddleware),
            );
          } catch (error) {
            console.error('Failed to save pending upload metadata:', error);
          }
        }

        const paymentData: PaymentData = {
          amount: pendingUpload.amount,
          currency: pendingUpload.currency,
          packageType: pendingUpload.packageType,
          photoCount: pendingUpload.photoCount,
          photos: state.photos,
        };

        setUploadProgress(75);
        await processPayment(paymentData);

        setUploadProgress(100);
        // Don't clear photos here - let the checkout page handle it after successful payment
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Unable to finalize your order. Please try again.',
        );
        if (typeof window !== 'undefined') {
          // Clear only sessionStorage metadata, photos stay in IndexedDB
          sessionStorage.removeItem(PENDING_UPLOAD_STORAGE_KEY);
        }
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    })();
  }, [
    processPayment,
    setError,
    setUploadProgress,
    setUploading,
    state.photos,
    state.userData,
  ]);

  const openFileSelector = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';

    input.onchange = e => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      if (files.length > 0) {
        addPhotos(files);
      }
    };

    input.click();
  }, [addPhotos]);

  const openCheckout = useCallback(() => {
    dispatch({ type: 'OPEN_CHECKOUT', payload: '' });
  }, []);

  const closeCheckout = useCallback(() => {
    dispatch({ type: 'CLOSE_CHECKOUT' });
  }, []);

  const processPhotosAfterPayment = useCallback(
    async (paymentIntentId: string, photosToProcess?: Photo[]) => {
      try {
        console.log('processPhotosAfterPayment: Starting...');
        const photos = photosToProcess || state.photos;
        console.log('processPhotosAfterPayment: Photos count:', photos.length);

        // Set processing state
        setProcessingPhotos(true);
        setProcessingStep('compressing', 'Compressing images...');

        // Load user data from storage
        const userData = await photoStorage.loadUserData();
        console.log('processPhotosAfterPayment: User data loaded:', userData);
        if (!userData) {
          throw new Error('User data not found in storage');
        }

        // Calculate package info
        const selectedCount = photos.length;
        let packageType;
        if (selectedCount <= 5) {
          packageType = 'No Package';
        } else if (selectedCount <= 11) {
          packageType = 'Quick Fix';
        } else if (selectedCount <= 23) {
          packageType = 'Growth Accelerator';
        } else {
          packageType = 'Premium';
        }

        // Prepare photos for upload using FormData
        const formData = new FormData();
        formData.append('paymentIntentId', paymentIntentId);
        formData.append('packageType', packageType);

        // Process photos in parallel for better performance
        setProcessingStep(
          'compressing',
          `Compressing ${photos.length} images...`,
        );

        console.log('processPhotosAfterPayment: Starting photo compression...');

        // Process photos in batches to avoid memory issues with large numbers
        const BATCH_SIZE = 10;
        const processedPhotos = [];

        for (let i = 0; i < photos.length; i += BATCH_SIZE) {
          const batch = photos.slice(i, i + BATCH_SIZE);
          console.log(
            `processPhotosAfterPayment: Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(photos.length / BATCH_SIZE)}`,
          );

          const batchResults = await Promise.all(
            batch.map(async (photo, batchIndex) => {
              const globalIndex = i + batchIndex;
              if (!photo) {
                console.log(
                  `processPhotosAfterPayment: Photo ${globalIndex} is null, skipping`,
                );
                return null;
              }
              try {
                console.log(
                  `processPhotosAfterPayment: Processing photo ${globalIndex}: ${photo.name}`,
                );
                const processed = await processPhotoForUpload(photo.file);
                console.log(
                  `processPhotosAfterPayment: Photo ${globalIndex} processed successfully`,
                );
                return {
                  ...processed,
                  originalPhoto: photo,
                  index: globalIndex,
                };
              } catch (error) {
                console.error(
                  `processPhotosAfterPayment: Error processing photo ${globalIndex}:`,
                  error,
                );
                throw error;
              }
            }),
          );

          processedPhotos.push(...batchResults);
        }

        console.log(
          'processPhotosAfterPayment: All photos processed, count:',
          processedPhotos.length,
        );

        // Upload photos sequentially to avoid payload size issues
        setProcessingStep('uploading', 'Uploading photos to server...');
        console.log(
          'processPhotosAfterPayment: Starting sequential photo upload...',
        );

        const uploadResults = [];
        const totalPhotos = processedPhotos.filter(p => p !== null).length;

        for (let i = 0; i < processedPhotos.length; i++) {
          const processed = processedPhotos[i];
          if (!processed) continue;

          const photoIndex = uploadResults.length + 1;
          setProcessingStep(
            'uploading',
            `Uploading photo ${photoIndex}/${totalPhotos}...`,
          );

          console.log(
            `processPhotosAfterPayment: Uploading photo ${photoIndex}/${totalPhotos}: ${processed.originalPhoto.name}`,
          );

          // Create FormData for single photo
          const singlePhotoFormData = new FormData();
          singlePhotoFormData.append('paymentIntentId', paymentIntentId);
          singlePhotoFormData.append('packageType', packageType);
          singlePhotoFormData.append('photoIndex', String(photoIndex));
          singlePhotoFormData.append('totalPhotos', String(totalPhotos));
          singlePhotoFormData.append('photoId', processed.originalPhoto.id);
          singlePhotoFormData.append('photoName', processed.originalPhoto.name);
          singlePhotoFormData.append('photoType', processed.originalPhoto.type);
          singlePhotoFormData.append(
            'photoSize',
            String(processed.originalPhoto.size),
          );
          singlePhotoFormData.append('photoWidth', String(processed.width));
          singlePhotoFormData.append('photoHeight', String(processed.height));
          singlePhotoFormData.append('photo', processed.file);

          try {
            const response = await fetch('/api/upload-single-photo', {
              method: 'POST',
              body: singlePhotoFormData,
            });

            if (!response.ok) {
              let serverMessage = '';
              try {
                serverMessage = await response.text();
              } catch {
                console.error(
                  `processPhotosAfterPayment: Photo ${photoIndex} upload failed:`,
                  response.status,
                  response.statusText,
                  serverMessage,
                );
                throw new Error(
                  serverMessage ||
                    `Failed to upload photo ${photoIndex} (server error)`,
                );
              }
            }

            const result = await response.json();
            uploadResults.push(result);
            console.log(
              `processPhotosAfterPayment: Photo ${photoIndex} uploaded successfully`,
            );

            // Small delay between uploads to avoid overwhelming the server
            if (i < processedPhotos.length - 1) {
              await new Promise(resolve => setTimeout(resolve, 500));
            }
          } catch (error) {
            console.error(
              `processPhotosAfterPayment: Error uploading photo ${photoIndex}:`,
              error,
            );
            throw error;
          }
        }

        console.log(
          'processPhotosAfterPayment: All photos uploaded successfully',
        );

        // Compute package info (used for email)
        const packageInfo = {
          name: packageType,
          discountedPrice:
            selectedCount *
            (selectedCount <= 5
              ? 15
              : selectedCount <= 11
                ? 10
                : selectedCount <= 23
                  ? 8.33
                  : 6),
        } as const;

        // Send order email after successful photo processing
        setProcessingStep('sending_email', 'Sending confirmation email...');
        console.log('processPhotosAfterPayment: Sending order email...');
        await sendOrderEmail(packageInfo, userData, photos);
        console.log('processPhotosAfterPayment: Order email sent successfully');

        // Mark as completed
        setProcessingStep('completed', 'Processing completed successfully!');

        // Reset processing state after a short delay
        setTimeout(() => {
          setProcessingPhotos(false);
          setProcessingStep('idle');
        }, 2000);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Failed to process photos after payment';
        console.error('processPhotosAfterPayment: Error:', message);
        setProcessingPhotos(false);
        setProcessingStep('idle');
        throw new Error(message);
      }
    },
    [state.photos, sendOrderEmail, setProcessingPhotos, setProcessingStep],
  );

  const value: PhotoContextValues = {
    ...state,
    addPhotos,
    removePhoto,
    clearPhotos,
    setUploading,
    setUploadProgress,
    setError,
    setUserData,
    setProcessingPayment,
    setProcessingPhotos,
    setProcessingStep,
    finalizeOrder,
    processPayment,
    sendOrderEmail,
    openFileSelector,
    openCheckout,
    closeCheckout,
    processPhotosAfterPayment,
    restorePhotosFromStorage,
  };

  return (
    <PhotoContext.Provider value={value}>{children}</PhotoContext.Provider>
  );
};

export const usePhotosContext = (): PhotoContextValues => {
  const context = useContext(PhotoContext);

  if (context === undefined) {
    throw new Error('usePhotos must be used within a PhotoProvider');
  }

  return context;
};
