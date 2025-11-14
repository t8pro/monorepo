'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Text,
  TextField,
  Button,
  Container,
  View,
  FormControl,
} from 'reshaped';
import { withMask } from 'use-mask-input';
import { z } from 'zod';
import styles from './styles.module.scss';

const formSchema = z.object({
  unemployedOrSeekingIncome: z.enum(['sim', 'nao'], {
    required_error: 'Por favor, responda esta pergunta',
  }),
  likesAppearingInVideos: z.enum(['sim', 'nao'], {
    required_error: 'Por favor, responda esta pergunta',
  }),
  wantsCreativeGuide: z.enum(['sim', 'nao'], {
    required_error: 'Por favor, responda esta pergunta',
  }),
  productAffinity: z
    .array(z.enum(['beleza', 'saude', 'fitness', 'alimentacao']))
    .min(1, 'Por favor, selecione pelo menos um produto'),
  name: z
    .string({ required_error: 'Campo obrigatório' })
    .min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z
    .string({ required_error: 'Campo obrigatório' })
    .email('Email inválido'),
  phone: z.string().optional(),
  instagram: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const PRODUCT_AFFINITIES = [
  { value: 'beleza', label: 'Beleza' },
  { value: 'saude', label: 'Saúde' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'alimentacao', label: 'Alimentação' },
] as const;

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const question1Ref = useRef<HTMLDivElement>(null);
  const question2Ref = useRef<HTMLDivElement>(null);
  const question3Ref = useRef<HTMLDivElement>(null);
  const productAffinityRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productAffinity: [],
    },
  });

  const productAffinity = watch('productAffinity') || [];

  const scrollToNext = (currentQuestion: number) => {
    setTimeout(() => {
      if (currentQuestion === 1 && question2Ref.current) {
        question2Ref.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else if (currentQuestion === 2 && question3Ref.current) {
        question3Ref.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else if (currentQuestion === 3 && productAffinityRef.current) {
        productAffinityRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);
  };

  const toggleProductAffinity = (
    value: 'beleza' | 'saude' | 'fitness' | 'alimentacao',
  ) => {
    const current = productAffinity;
    const newAffinity = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    setValue('productAffinity', newAffinity);
  };

  const scrollToFirstError = () => {
    setTimeout(() => {
      if (errors.unemployedOrSeekingIncome && question1Ref.current) {
        question1Ref.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else if (errors.likesAppearingInVideos && question2Ref.current) {
        question2Ref.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else if (errors.wantsCreativeGuide && question3Ref.current) {
        question3Ref.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else if (errors.productAffinity && productAffinityRef.current) {
        productAffinityRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else if (errors.name && nameRef.current) {
        nameRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else if (errors.email && emailRef.current) {
        emailRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/lead/thank-you');
      } else {
        throw new Error('Erro ao enviar formulário');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error submitting form:', error);
      alert('Erro ao enviar formulário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.leadPage}>
      <Container>
        <form
          onSubmit={handleSubmit(onSubmit, scrollToFirstError)}
          className={styles.form}
        >
          <div className={styles.header}>
            <h1 className={styles.title}>Me conte um pouco sobre você</h1>
            <p className={styles.subtitle}>
              Com essas informações você pode receber uma proposta personalizada
              nossa
            </p>
          </div>

          <div className={styles.questionsSection}>
            <div ref={question1Ref} className={styles.questionGroup}>
              <h2 className={styles.question}>
                Você está desempregada(o) ou procurando fazer renda sem sair de
                casa?
              </h2>
              <div className={styles.yesNoButtons}>
                <Controller
                  name="unemployedOrSeekingIncome"
                  control={control}
                  render={({ field }) => (
                    <div className={styles.buttonGroup}>
                      <button
                        type="button"
                        className={`${styles.yesNoButton} ${field.value === 'sim' ? styles.active : ''}`}
                        onClick={() => {
                          field.onChange('sim');
                          scrollToNext(1);
                        }}
                      >
                        Sim
                      </button>
                      <button
                        type="button"
                        className={`${styles.yesNoButton} ${field.value === 'nao' ? styles.active : ''}`}
                        onClick={() => {
                          field.onChange('nao');
                          scrollToNext(1);
                        }}
                      >
                        Não
                      </button>
                    </div>
                  )}
                />
                {errors.unemployedOrSeekingIncome && (
                  <Text
                    variant="caption-1"
                    color="critical"
                    className={styles.error}
                  >
                    {errors.unemployedOrSeekingIncome.message}
                  </Text>
                )}
              </div>
            </div>

            <div ref={question2Ref} className={styles.questionGroup}>
              <h2 className={styles.question}>
                Você gosta de aparecer em vídeos para internet?
              </h2>
              <div className={styles.yesNoButtons}>
                <Controller
                  name="likesAppearingInVideos"
                  control={control}
                  render={({ field }) => (
                    <div className={styles.buttonGroup}>
                      <button
                        type="button"
                        className={`${styles.yesNoButton} ${field.value === 'sim' ? styles.active : ''}`}
                        onClick={() => {
                          field.onChange('sim');
                          scrollToNext(2);
                        }}
                      >
                        Sim
                      </button>
                      <button
                        type="button"
                        className={`${styles.yesNoButton} ${field.value === 'nao' ? styles.active : ''}`}
                        onClick={() => {
                          field.onChange('nao');
                          scrollToNext(2);
                        }}
                      >
                        Não
                      </button>
                    </div>
                  )}
                />
                {errors.likesAppearingInVideos && (
                  <Text
                    variant="caption-1"
                    color="critical"
                    className={styles.error}
                  >
                    {errors.likesAppearingInVideos.message}
                  </Text>
                )}
              </div>
            </div>

            <div ref={question3Ref} className={styles.questionGroup}>
              <h2 className={styles.question}>
                Você gostaria de receber um guia que te ensina a fazer um
                criativo como exemplo.
              </h2>
              <p className={styles.questionDescription}>
                Após gravar, você me encaminha o material que eu vou avaliar e
                te responder se está no caminho certo! 😍 E pode ficar tranquila
                que eu vou te passar exatamente o roteiro que você vai fazer.
                Está no meu Guia.
              </p>
              <div className={styles.yesNoButtons}>
                <Controller
                  name="wantsCreativeGuide"
                  control={control}
                  render={({ field }) => (
                    <div className={styles.buttonGroup}>
                      <button
                        type="button"
                        className={`${styles.yesNoButton} ${field.value === 'sim' ? styles.active : ''}`}
                        onClick={() => {
                          field.onChange('sim');
                          scrollToNext(3);
                        }}
                      >
                        Sim
                      </button>
                      <button
                        type="button"
                        className={`${styles.yesNoButton} ${field.value === 'nao' ? styles.active : ''}`}
                        onClick={() => {
                          field.onChange('nao');
                          scrollToNext(3);
                        }}
                      >
                        Não
                      </button>
                    </div>
                  )}
                />
                {errors.wantsCreativeGuide && (
                  <Text
                    variant="caption-1"
                    color="critical"
                    className={styles.error}
                  >
                    {errors.wantsCreativeGuide.message}
                  </Text>
                )}
              </div>
            </div>
          </div>

          <div
            ref={productAffinityRef}
            className={styles.productAffinitySection}
          >
            <h2 className={styles.sectionTitle}>
              Quais são os produtos que você tem mais afinidade?
            </h2>
            <div className={styles.productButtons}>
              {PRODUCT_AFFINITIES.map(product => (
                <button
                  key={product.value}
                  type="button"
                  className={`${styles.productButton} ${productAffinity.includes(product.value) ? styles.active : ''}`}
                  onClick={() => toggleProductAffinity(product.value)}
                >
                  {product.label}
                </button>
              ))}
            </div>
            {errors.productAffinity && (
              <Text
                variant="caption-1"
                color="critical"
                className={styles.error}
              >
                {errors.productAffinity.message}
              </Text>
            )}
          </div>

          <div className={styles.infoSection}>
            <h2 className={styles.sectionTitle}>Suas informações</h2>
            <View direction="row" gap={4}>
              <View.Item columns={6}>
                <div ref={nameRef}>
                  <FormControl>
                    <FormControl.Label>Nome</FormControl.Label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          size="large"
                          name="name"
                          value={field.value || ''}
                          onChange={({ value }) => field.onChange(value)}
                          className={styles.input}
                        />
                      )}
                    />
                    {errors.name && (
                      <Text
                        variant="caption-1"
                        color="critical"
                        className={styles.error}
                      >
                        {errors.name.message}
                      </Text>
                    )}
                  </FormControl>
                </div>
              </View.Item>

              <View.Item columns={6}>
                <FormControl>
                  <FormControl.Label>Telefone</FormControl.Label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="large"
                        name="phone"
                        value={field.value || ''}
                        onChange={({ value }) => field.onChange(value)}
                        placeholder="(99) 9 9999-9999"
                        inputAttributes={{
                          type: 'tel',
                          ref: withMask('(99) 9 9999-9999'),
                        }}
                        className={styles.input}
                      />
                    )}
                  />
                  {errors.phone && (
                    <Text
                      variant="caption-1"
                      color="critical"
                      className={styles.error}
                    >
                      {errors.phone.message}
                    </Text>
                  )}
                </FormControl>
              </View.Item>

              <View.Item columns={6}>
                <div ref={emailRef}>
                  <FormControl>
                    <FormControl.Label>E-mail</FormControl.Label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          size="large"
                          name="email"
                          value={field.value || ''}
                          onChange={({ value }) => field.onChange(value)}
                          inputAttributes={{ type: 'email' }}
                          placeholder="example@gmail.com"
                          className={styles.input}
                        />
                      )}
                    />
                    {errors.email && (
                      <Text
                        variant="caption-1"
                        color="critical"
                        className={styles.error}
                      >
                        {errors.email.message}
                      </Text>
                    )}
                  </FormControl>
                </div>
              </View.Item>

              <View.Item columns={6}>
                <FormControl>
                  <FormControl.Label>@ do instagram</FormControl.Label>
                  <Controller
                    name="instagram"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="large"
                        name="instagram"
                        value={field.value || ''}
                        onChange={({ value }) => field.onChange(value)}
                        className={styles.input}
                      />
                    )}
                  />
                  {errors.instagram && (
                    <Text
                      variant="caption-1"
                      color="critical"
                      className={styles.error}
                    >
                      {errors.instagram.message}
                    </Text>
                  )}
                </FormControl>
              </View.Item>
            </View>
          </div>

          <div className={styles.submitSection}>
            <Button type="submit" size="large" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Baixar Guia Gratuito!'}
            </Button>
          </div>
        </form>
      </Container>
    </section>
  );
}
