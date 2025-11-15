import { z } from 'zod';
import { formSchema } from './schema';

export type FormData = z.infer<typeof formSchema>;

export type ProductAffinity = 'beleza' | 'saude' | 'fitness' | 'alimentacao';
