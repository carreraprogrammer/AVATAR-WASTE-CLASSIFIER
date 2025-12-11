/**
 * Spinner Atom Component
 * Loading spinner
 */

import React from 'react';
import { IonSpinner } from '@ionic/react';
import type { SpinnerProps } from '@/types';
import styles from './Spinner.module.css';

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  color,
  className = ''
}) => {
  const sizeClass = styles[`spinner--${size}`] || '';

  return (
    <IonSpinner
      name="crescent"
      color={color || 'primary'}
      className={`${styles.spinner} ${sizeClass} ${className}`}
    />
  );
};

export default Spinner;
