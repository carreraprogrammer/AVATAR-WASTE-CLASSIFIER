/**
 * Button Atom Component
 * Reusable button with variants
 */

import React from 'react';
import { IonButton, IonSpinner } from '@ionic/react';
import type { ButtonProps } from '@/types';
import styles from './Button.module.css';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  onClick,
  className = '',
  type = 'button',
  ...props
}) => {
  const variantClass = styles[`button--${variant}`] || '';
  const sizeClass = styles[`button--${size}`] || '';

  return (
    <IonButton
      onClick={onClick}
      disabled={disabled || loading}
      className={`${styles.button} ${variantClass} ${sizeClass} ${className}`}
      color={variant === 'primary' ? 'primary' : 'secondary'}
      size={size === 'large' ? 'large' : 'default'}
      {...props}
    >
      {loading ? (
        <IonSpinner name="crescent" className={styles.spinner} />
      ) : (
        <>
          {icon && <span className={styles.icon}>{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </IonButton>
  );
};

export default Button;
