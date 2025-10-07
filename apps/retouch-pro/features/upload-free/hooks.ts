'use client';

import { useMutation } from '@tanstack/react-query';
import imageCompression from 'browser-image-compression';
import { useRouter } from 'next/navigation';
import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { UploadFreeFormState } from './types';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_COMPRESSED_SIZE = 2 * 1024 * 1024; // 2MB target after compression

const initialFormState: UploadFreeFormState = {
  name: '',
  email: '',
  phone: '',
  company: '',
};

type FieldErrors = Partial<Record<keyof UploadFreeFormState | 'photo', string>>;

type VerifyResponse = {
  email?: string;
  exists: boolean;
};

type SubmitResponse = {
  success: boolean;
  receivedAt: string;
};

const parseError = async (response: Response) => {
  try {
    const data = await response.json();
    return data?.message || 'Unexpected server response.';
  } catch {
    return response.statusText || 'Unexpected server response.';
  }
};

export const useUploadFree = () => {
  const [formState, setFormState] =
    useState<UploadFreeFormState>(initialFormState);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();

  const verifyMutation = useMutation<VerifyResponse, Error, { email: string }>({
    mutationKey: ['upload-free', 'verify'],
    mutationFn: async ({ email }) => {
      const response = await fetch('/api/upload-free/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const message = await parseError(response);
        throw new Error(message);
      }

      return (await response.json()) as VerifyResponse;
    },
  });

  // TODO: Wire this mutation to a production API once backend support exists.
  const submitMutation = useMutation<SubmitResponse, Error, FormData>({
    mutationKey: ['upload-free', 'submit'],
    mutationFn: async formData => {
      const response = await fetch('/api/upload-free/submit', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const message = await parseError(response);
        throw new Error(message);
      }

      return (await response.json()) as SubmitResponse;
    },
  });

  const revokePreview = useCallback((url: string | null) => {
    if (url) {
      URL.revokeObjectURL(url);
    }
  }, []);

  useEffect(() => {
    return () => {
      revokePreview(previewUrl);
    };
  }, [previewUrl, revokePreview]);

  const handleInputChange = useCallback(
    (field: keyof UploadFreeFormState) =>
      (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormState(prev => ({ ...prev, [field]: value }));
        setFieldErrors(prev => ({ ...prev, [field]: undefined }));
      },
    [],
  );

  const compressImage = useCallback(async (file: File): Promise<File> => {
    try {
      const options = {
        maxSizeMB: MAX_COMPRESSED_SIZE / (1024 * 1024), // Convert to MB
        maxWidthOrHeight: 1920, // Max dimension
        useWebWorker: true,
        fileType: 'image/jpeg', // Convert to JPEG for better compression
      };

      return await imageCompression(file, options);
    } catch {
      return file;
    }
  }, []);

  const attachPhoto = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        setFieldErrors(prev => ({
          ...prev,
          photo: 'Only image files are allowed.',
        }));
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setFieldErrors(prev => ({
          ...prev,
          photo: 'Image must be 10MB or less.',
        }));
        return;
      }

      try {
        // Show loading state
        setFieldErrors(prev => ({ ...prev, photo: 'Compressing image...' }));

        const compressedFile = await compressImage(file);

        revokePreview(previewUrl);
        setSelectedPhoto(compressedFile);
        setPreviewUrl(URL.createObjectURL(compressedFile));
        setFieldErrors(prev => ({ ...prev, photo: undefined }));
      } catch {
        setFieldErrors(prev => ({
          ...prev,
          photo: 'Failed to process image. Please try again.',
        }));
      }
    },
    [previewUrl, revokePreview, compressImage],
  );

  const handleFileSelect = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) {
        return;
      }

      const [file] = files;
      await attachPhoto(file as File);
    },
    [attachPhoto],
  );

  const handleRemovePhoto = useCallback(() => {
    revokePreview(previewUrl);
    setSelectedPhoto(null);
    setPreviewUrl(null);
  }, [previewUrl, revokePreview]);

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
      await handleFileSelect(event.dataTransfer.files);
    },
    [handleFileSelect],
  );

  const validateForm = useCallback(() => {
    const errors: FieldErrors = {};

    if (!formState.name.trim()) {
      errors.name = 'Name is required.';
    }

    if (!formState.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = 'Enter a valid email address.';
    }

    if (!formState.phone.trim()) {
      errors.phone = 'Phone is required.';
    }

    if (!formState.company.trim()) {
      errors.company = 'Company name is required.';
    }

    if (!selectedPhoto) {
      errors.photo = 'Please upload a photo to continue.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formState, selectedPhoto]);

  const resetForm = useCallback(() => {
    setFormState(initialFormState);
    setSelectedPhoto(null);
    setFieldErrors({});
    setIsDragging(false);
    revokePreview(previewUrl);
    setPreviewUrl(null);
  }, [previewUrl, revokePreview]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setFormError(null);

      if (!validateForm() || !selectedPhoto) {
        if (!selectedPhoto) {
          setFieldErrors(prev => ({
            ...prev,
            photo: 'Please upload a photo to continue.',
          }));
        }
        setFormError('Please fix the highlighted fields.');
        return;
      }

      try {
        const verification = await verifyMutation.mutateAsync({
          email: formState.email,
        });

        if (verification.exists) {
          setFieldErrors(prev => ({
            ...prev,
            email: 'This email has already requested a free upload.',
          }));
          setFormError('This email has already been used for a free upload.');
          return;
        }

        const formData = new FormData();
        formData.append('name', formState.name);
        formData.append('email', formState.email);
        formData.append('phone', formState.phone);
        formData.append('company', formState.company);
        formData.append('photo', selectedPhoto);
        await submitMutation.mutateAsync(formData);

        resetForm();
        router.push('/upload-free/thank-you');
      } catch (error) {
        setFormError(
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.',
        );
      }
    },
    [
      formState,
      resetForm,
      selectedPhoto,
      submitMutation,
      validateForm,
      verifyMutation,
      router,
    ],
  );

  const isSubmitting = useMemo(
    () => verifyMutation.isPending || submitMutation.isPending,
    [submitMutation.isPending, verifyMutation.isPending],
  );

  return {
    formState,
    fieldErrors,
    formError,
    handleInputChange,
    handleSubmit,
    handleFileSelect,
    handleRemovePhoto,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    isDragging,
    isSubmitting,
    previewUrl,
    selectedPhoto,
  };
};
