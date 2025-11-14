'use client';

import Link from 'next/link';
import { Button, Text, View } from 'reshaped';
import type { ButtonProps } from 'reshaped';
import styles from './styles.module.scss';

export interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    href?: string;
    onClick?: () => void;
    label: string;
  } & Omit<ButtonProps, 'children' | 'onClick' | 'href'>;
  icon?: React.ReactNode;
}

export const EmptyState = ({
  title,
  description,
  action,
  icon,
}: EmptyStateProps) => {
  if (!action) {
    return (
      <div className={styles.emptyState}>
        <View gap={4} align="center">
          {icon && <View.Item>{icon}</View.Item>}
          <View.Item>
            <Text variant="featured-2" weight="bold" align="center">
              {title}
            </Text>
          </View.Item>
          <View.Item>
            <Text variant="body-2" align="center">
              {description}
            </Text>
          </View.Item>
        </View>
      </div>
    );
  }

  const { href, onClick, label, ...buttonProps } = action;

  return (
    <div className={styles.emptyState}>
      <View gap={4} align="center">
        {icon && <View.Item>{icon}</View.Item>}
        <View.Item>
          <Text variant="featured-2" weight="bold" align="center">
            {title}
          </Text>
        </View.Item>
        <View.Item>
          <Text variant="body-2" align="center">
            {description}
          </Text>
        </View.Item>
        <View.Item>
          {href ? (
            <Link href={href}>
              <Button {...buttonProps}>{label}</Button>
            </Link>
          ) : (
            <Button {...buttonProps} onClick={onClick}>
              {label}
            </Button>
          )}
        </View.Item>
      </View>
    </div>
  );
};
