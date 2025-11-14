'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Container,
  View,
  Text,
  TextField,
  Button,
  Card,
} from 'reshaped';
import { z } from 'zod';
import styles from './styles.module.scss';

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function LeadPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/tell-me-more', {
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
          <View paddingTop={12} paddingBottom={12} align="center">
            <View.Item>
              <Card padding={6} className={styles.successCard}>
                <View gap={4} align="center">
                  <View.Item>
                    <span
                      className="material-symbols-rounded"
                      style={{ fontSize: '64px', color: '#22c55e' }}
                    >
                      check_circle
                    </span>
                  </View.Item>
                  <View.Item>
                    <Text variant="featured-2" weight="bold" align="center">
                      Obrigado!
                    </Text>
                  </View.Item>
                  <View.Item>
                    <Text variant="body-2" align="center">
                      Recebemos suas informações. Em breve você receberá o guia
                      por email.
                    </Text>
                  </View.Item>
                </View>
              </Card>
            </View.Item>
          </View>
        </Container>
      </section>
    );
  }

  return (
    <section className={styles.leadPage}>
      <Container>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              Transforme seu celular em uma fonte de renda
            </h1>
            <p className={styles.subtitle}>
              Receba o guia completo e gratuito para começar a ganhar dinheiro
              criando vídeos UGC
            </p>
          </div>

          <Card padding={6} className={styles.formCard}>
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
                  <Button
                    type="submit"
                    size="large"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Receber guia gratuito'}
                  </Button>
                </View.Item>
              </View>
            </form>
          </Card>
        </div>
      </Container>
    </section>
  );
}

