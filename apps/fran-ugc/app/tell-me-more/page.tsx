'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Container,
  View,
  Text,
  TextField,
  TextArea,
  Button,
  Card,
} from 'reshaped';
import { z } from 'zod';
import styles from './styles.module.scss';

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  goals: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function TellMeMore() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
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
      console.error('Error submitting form:', error);
      alert('Erro ao enviar formulário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Container>
        <View paddingTop={12} paddingBottom={12} align="center">
          <View.Item>
            <Card padding={6}>
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
    );
  }

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
                    <TextField
                      placeholder="Seu nome completo"
                      {...register('name')}
                      error={errors.name?.message}
                    />
                  </View.Item>

                  <View.Item>
                    <TextField
                      type="email"
                      placeholder="Seu melhor email"
                      {...register('email')}
                      error={errors.email?.message}
                    />
                  </View.Item>

                  <View.Item>
                    <TextField
                      type="tel"
                      placeholder="Telefone (opcional)"
                      {...register('phone')}
                      error={errors.phone?.message}
                    />
                  </View.Item>

                  <View.Item>
                    <TextArea
                      placeholder="Conte-nos sobre seus objetivos com UGC (opcional)"
                      rows={4}
                      {...register('goals')}
                      error={errors.goals?.message}
                    />
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
}
