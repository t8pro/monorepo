'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  View,
  Text,
  TextField,
  TextArea,
  Button,
  Card,
  Container,
} from 'reshaped';
import { z } from 'zod';
import styles from './styles.module.scss';

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  goals: z.string().optional(),
});

export type TellMeMoreFormData = z.infer<typeof formSchema>;

export const TellMeMoreForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TellMeMoreFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: TellMeMoreFormData) => {
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
        router.push('/thank-you');
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
    <Container>
      <View paddingTop={12} paddingBottom={12}>
        <View.Item>
          <View gap={6} maxWidth="600px" className={styles.formContainer}>
            <View.Item>
              <Text variant="featured-2" weight="bold" as="h1">
                Conte-me mais sobre você
              </Text>
            </View.Item>

            <View.Item>
              <Text variant="body-2">
                Preencha o formulário abaixo para receber o guia completo de UGC
                em prática.
              </Text>
            </View.Item>

            <Card padding={6}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <View gap={4}>
                  <View.Item>
                    <View gap={1}>
                      <View.Item>
                        <Controller
                          name="name"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              name="name"
                              placeholder="Seu nome completo"
                              value={field.value || ''}
                              onChange={({ value }) => field.onChange(value)}
                            />
                          )}
                        />
                      </View.Item>
                      {errors.name && (
                        <View.Item>
                          <Text variant="caption-1" color="critical">
                            {errors.name.message}
                          </Text>
                        </View.Item>
                      )}
                    </View>
                  </View.Item>

                  <View.Item>
                    <View gap={1}>
                      <View.Item>
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              name="email"
                              placeholder="Seu melhor email"
                              value={field.value || ''}
                              onChange={({ value }) => field.onChange(value)}
                              inputAttributes={{ type: 'email' }}
                            />
                          )}
                        />
                      </View.Item>
                      {errors.email && (
                        <View.Item>
                          <Text variant="caption-1" color="critical">
                            {errors.email.message}
                          </Text>
                        </View.Item>
                      )}
                    </View>
                  </View.Item>

                  <View.Item>
                    <View gap={1}>
                      <View.Item>
                        <Controller
                          name="phone"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              name="phone"
                              placeholder="Telefone (opcional)"
                              value={field.value || ''}
                              onChange={({ value }) => field.onChange(value)}
                              inputAttributes={{ type: 'tel' }}
                            />
                          )}
                        />
                      </View.Item>
                      {errors.phone && (
                        <View.Item>
                          <Text variant="caption-1" color="critical">
                            {errors.phone.message}
                          </Text>
                        </View.Item>
                      )}
                    </View>
                  </View.Item>

                  <View.Item>
                    <View gap={1}>
                      <View.Item>
                        <Controller
                          name="goals"
                          control={control}
                          render={({ field }) => (
                            <TextArea
                              name="goals"
                              placeholder="Conte-nos sobre seus objetivos com UGC (opcional)"
                              value={field.value || ''}
                              onChange={({ value }) => field.onChange(value)}
                              inputAttributes={{ rows: 4 }}
                            />
                          )}
                        />
                      </View.Item>
                      {errors.goals && (
                        <View.Item>
                          <Text variant="caption-1" color="critical">
                            {errors.goals.message}
                          </Text>
                        </View.Item>
                      )}
                    </View>
                  </View.Item>

                  <View.Item>
                    <Button
                      type="submit"
                      size="large"
                      fullWidth
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar e receber o guia'}
                    </Button>
                  </View.Item>
                </View>
              </form>
            </Card>
          </View>
        </View.Item>
      </View>
    </Container>
  );
};
