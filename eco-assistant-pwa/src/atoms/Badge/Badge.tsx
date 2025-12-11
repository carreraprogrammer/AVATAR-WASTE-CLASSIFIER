/**
 * Badge Atom Component
 * Display badge for materials and confidence
 */

import React from 'react';
import { IonBadge } from '@ionic/react';
import type { BadgeProps } from '@/types';
import styles from './Badge.module.css';

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'info',
  size = 'medium',
  className = ''
}) => {
  const variantClass = styles[`badge--${variant}`] || '';
  const sizeClass = styles[`badge--${size}`] || '';

  return (
    <IonBadge
      className={`${styles.badge} ${variantClass} ${sizeClass} ${className}`}
      color={variant}
    >
      {children}
    </IonBadge>
  );
};

export default Badge;
