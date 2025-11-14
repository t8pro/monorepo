'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Container, Text, TextField, Button } from 'reshaped';
import { z } from 'zod';
import styles from './styles.module.scss';
import { LeadSuccess } from '@/features/lead/success';

const formSchema = z.object({
  unemployedOrSeekingIncome: z.enum(['sim', 'nao']).optional(),
  likesAppearingInVideos: z.enum(['sim', 'nao']).optional(),
  wantsCreativeGuide: z.enum(['sim', 'nao']).optional(),
  productAffinity: z
    .array(z.enum(['beleza', 'saude', 'fitness', 'alimentacao']))
    .optional(),
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
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

export default function LeadPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const toggleProductAffinity = (
    value: 'beleza' | 'saude' | 'fitness' | 'alimentacao',
  ) => {
    const current = productAffinity;
    const newAffinity = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    setValue('productAffinity', newAffinity);
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
        setIsSuccess(true);
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

  if (isSuccess) {
    return (
      <section className={styles.leadPage}>
        <Container>
          <LeadSuccess />
        </Container>
      </section>
    );
  }

  return (
    <section className={styles.leadPage}>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.header}>
            <h1 className={styles.title}>Me conte um pouco sobre você</h1>
            <p className={styles.subtitle}>
              Com essas informações você pode receber uma proposta personalizada
              nossa
            </p>
          </div>

          <div className={styles.questionsSection}>
            <div className={styles.questionGroup}>
              <h2 className={styles.question}>
                Você está desempregada(o) ou procurando fazer renda sem sair de
                casa?
              </h2>
              <div className={styles.yesNoButtons}>
                <Controller
                  name="unemployedOrSeekingIncome"
                  control={control}
                  render={({ field }) => (
                    <>
                      <button
                        type="button"
                        className={`${styles.yesNoButton} ${field.value === 'nao' ? styles.active : ''}`}
                        onClick={() => field.onChange('nao')}
                      >
                        Não
                      </button>
                      <button
                        type="button"
                        className={`${styles.yesNoButton} ${field.value === 'sim' ? styles.active : ''}`}
                        onClick={() => field.onChange('sim')}
                      >
                        Sim
                      </button>
                    </>
                  )}
                />
              </div>
            </div>

            <div className={styles.questionGroup}>
              <h2 className={styles.question}>
                Você gosta de aparecer em vídeos para internet?
              </h2>
              <div className={styles.yesNoButtons}>
                <Controller
                  name="likesAppearingInVideos"
                  control={control}
                  render={({ field }) => (
                    <>
                      <button
                        type="button"
                        className={`${styles.yesNoButton} ${field.value === 'nao' ? styles.active : ''}`}
                        onClick={() => field.onChange('nao')}
                      >
                        Não
                      </button>
                      <button
                        type="button"
                        className={`${styles.yesNoButton} ${field.value === 'sim' ? styles.active : ''}`}
                        onClick={() => field.onChange('sim')}
                      >
                        Sim
                      </button>
                    </>
                  )}
                />
              </div>
            </div>

            <div className={styles.questionGroup}>
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
                    <>
                      <button
                        type="button"
                        className={`${styles.yesNoButton} ${field.value === 'nao' ? styles.active : ''}`}
                        onClick={() => field.onChange('nao')}
                      >
                        Não
                      </button>
                      <button
                        type="button"
                        className={`${styles.yesNoButton} ${field.value === 'sim' ? styles.active : ''}`}
                        onClick={() => field.onChange('sim')}
                      >
                        Sim
                      </button>
                    </>
                  )}
                />
              </div>
            </div>
          </div>

          <div className={styles.productAffinitySection}>
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
          </div>

          <div className={styles.infoSection}>
            <h2 className={styles.sectionTitle}>Suas informações</h2>
            <div className={styles.formFields}>
              <div className={styles.formColumn}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Nome</label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
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
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Telefone</label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        name="phone"
                        value={field.value || ''}
                        onChange={({ value }) => field.onChange(value)}
                        inputAttributes={{ type: 'tel' }}
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
                </div>
              </div>

              <div className={styles.formColumn}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>E-mail</label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        name="email"
                        value={field.value || ''}
                        onChange={({ value }) => field.onChange(value)}
                        inputAttributes={{ type: 'email' }}
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
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>@ do instagram</label>
                  <Controller
                    name="instagram"
                    control={control}
                    render={({ field }) => (
                      <TextField
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
                </div>
              </div>
            </div>
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
