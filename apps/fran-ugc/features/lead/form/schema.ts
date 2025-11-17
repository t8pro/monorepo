import { z } from 'zod';

export const formSchema = z.object({
  unemployedOrSeekingIncome: z.enum(['sim', 'nao'], {
    message: 'Por favor, responda esta pergunta',
  }),
  likesAppearingInVideos: z.enum(['sim', 'nao'], {
    message: 'Por favor, responda esta pergunta',
  }),
  wantsCreativeGuide: z.enum(['sim', 'nao'], {
    message: 'Por favor, responda esta pergunta',
  }),
  productAffinity: z
    .array(z.enum(['beleza', 'saude', 'fitness', 'alimentacao']))
    .min(1, 'Por favor, selecione pelo menos um produto'),
  name: z
    .string({ message: 'Campo obrigatório' })
    .min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string({ message: 'Campo obrigatório' }).email('Email inválido'),
  phone: z
    .string({ message: 'Campo obrigatório' })
    .min(1, 'Telefone é obrigatório')
    .refine(val => !val.includes('_'), {
      message: 'Por favor, preencha o telefone completo',
    }),
  instagram: z
    .string({ message: 'Campo obrigatório' })
    .min(1, 'Instagram é obrigatório'),
  dataConsent: z.boolean().refine(val => val === true, {
    message: 'Você precisa aceitar o compartilhamento de dados',
  }),
});
