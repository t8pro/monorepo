import { InputHTMLAttributes, ReactNode } from 'react';

export type CheckboxSize = 'small' | 'medium' | 'large';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: CheckboxSize;
  label?: ReactNode;
}
