import { clsx } from 'clsx';
import React, { forwardRef, useId } from 'react';
import styles from './styles.module.scss';
import type { CheckboxProps } from './types.js';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      name,
      checked,
      defaultChecked,
      disabled = false,
      onChange,
      size = 'medium',
      className,
      label,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <label
        className={clsx(
          styles.checkbox,
          styles[`size-${size}`],
          disabled && styles.disabled,
          className,
        )}
        htmlFor={inputId}
      >
        <input
          id={inputId}
          ref={ref}
          type="checkbox"
          name={name}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={onChange}
          className={styles.input}
          {...rest}
        />
        <span className={styles.indicator} aria-hidden>
          <span className={styles.checkmark} />
        </span>
        {label && (
          <span className={styles.label} data-slot="label">
            {label}
          </span>
        )}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export type { CheckboxProps } from './types.js';
