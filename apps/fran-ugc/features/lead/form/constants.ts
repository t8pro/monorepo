import { ProductAffinity } from './types';

export const PRODUCT_AFFINITIES: Array<{
  value: ProductAffinity;
  label: string;
}> = [
  { value: 'beleza', label: 'Beleza' },
  { value: 'saude', label: 'Saúde' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'alimentacao', label: 'Alimentação' },
] as const;
