import { ProductAffinity } from './types';

export const scrollToNext = (
  currentQuestion: number,
  refs: {
    question1Ref?: React.RefObject<HTMLDivElement | null>;
    question2Ref: React.RefObject<HTMLDivElement | null>;
    question3Ref: React.RefObject<HTMLDivElement | null>;
    productAffinityRef: React.RefObject<HTMLDivElement | null>;
  },
) => {
  setTimeout(() => {
    if (currentQuestion === 1 && refs.question2Ref.current) {
      refs.question2Ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else if (currentQuestion === 2 && refs.question3Ref.current) {
      refs.question3Ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else if (currentQuestion === 3 && refs.productAffinityRef.current) {
      refs.productAffinityRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, 100);
};

export const scrollToFirstError = (
  errors: Record<string, { message?: string } | undefined>,
  refs: {
    question1Ref: React.RefObject<HTMLDivElement | null>;
    question2Ref: React.RefObject<HTMLDivElement | null>;
    question3Ref: React.RefObject<HTMLDivElement | null>;
    productAffinityRef: React.RefObject<HTMLDivElement | null>;
    nameRef: React.RefObject<HTMLDivElement | null>;
    emailRef: React.RefObject<HTMLDivElement | null>;
  },
) => {
  setTimeout(() => {
    if (errors.unemployedOrSeekingIncome && refs.question1Ref.current) {
      refs.question1Ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else if (errors.likesAppearingInVideos && refs.question2Ref.current) {
      refs.question2Ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else if (errors.wantsCreativeGuide && refs.question3Ref.current) {
      refs.question3Ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else if (errors.productAffinity && refs.productAffinityRef.current) {
      refs.productAffinityRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else if (errors.name && refs.nameRef.current) {
      refs.nameRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else if (errors.email && refs.emailRef.current) {
      refs.emailRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, 100);
};

export const toggleProductAffinity = (
  value: ProductAffinity,
  current: ProductAffinity[],
): ProductAffinity[] => {
  return current.includes(value)
    ? current.filter(item => item !== value)
    : [...current, value];
};

export const submitForm = async (data: unknown): Promise<void> => {
  const response = await fetch('/api/submit-lead', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Erro ao enviar formulário');
  }
};
