'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { formSchema } from './schema';
import { FormData, ProductAffinity } from './types';
import {
  scrollToFirstError,
  scrollToNext,
  submitForm,
  toggleProductAffinity as toggleProductAffinityUtil,
} from './utils';

export const useLeadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const question1Ref = useRef<HTMLDivElement | null>(null);
  const question2Ref = useRef<HTMLDivElement | null>(null);
  const question3Ref = useRef<HTMLDivElement | null>(null);
  const productAffinityRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLDivElement | null>(null);
  const emailRef = useRef<HTMLDivElement | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productAffinity: [],
      dataConsent: false,
    },
  });

  const productAffinity = watch('productAffinity') || [];
  const dataConsent = watch('dataConsent') || false;

  const handleScrollToNext = (currentQuestion: number) => {
    scrollToNext(currentQuestion, {
      question1Ref,
      question2Ref,
      question3Ref,
      productAffinityRef,
    });
  };

  const toggleProductAffinity = (value: ProductAffinity) => {
    const newAffinity = toggleProductAffinityUtil(value, productAffinity);
    setValue('productAffinity', newAffinity);
    if (newAffinity.length > 0 && errors.productAffinity) {
      clearErrors('productAffinity');
    }
  };

  const handleScrollToFirstError = () => {
    scrollToFirstError(errors, {
      question1Ref,
      question2Ref,
      question3Ref,
      productAffinityRef,
      nameRef,
      emailRef,
    });
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await submitForm(data);
      router.push('/lead/thank-you');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error submitting form:', error);
      alert('Erro ao enviar formulário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit, handleScrollToFirstError),
    productAffinity,
    toggleProductAffinity,
    handleScrollToNext,
    isSubmitting,
    errors,
    dataConsent,
    refs: {
      question1Ref,
      question2Ref,
      question3Ref,
      productAffinityRef,
      nameRef,
      emailRef,
    },
  };
};
