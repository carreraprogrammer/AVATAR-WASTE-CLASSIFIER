/**
 * StatusBadge Molecule
 * Display material type with NTC 2184 color
 */

import React from 'react';
import { IonBadge } from '@ionic/react';
import { MATERIAL_COLORS } from '@/constants';
import type { StatusBadgeProps } from '@/types';
import styles from './StatusBadge.module.css';

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  material,
  confidence,
  size = 'medium',
  className = ''
}) => {
  const colorInfo = MATERIAL_COLORS[material];
  const sizeClass = styles[`badge--${size}`] || '';

  return (
    <div className={`${styles.badgeContainer} ${sizeClass} ${className}`}>
      <IonBadge
        style={{
          backgroundColor: colorInfo.hex,
          color: colorInfo.textColor
        }}
        className={styles.badge}
      >
        <div className={styles.content}>
          <span className={styles.material}>{material}</span>
          <span className={styles.color}>{colorInfo.color}</span>
        </div>
      </IonBadge>

      {confidence !== undefined && (
        <div className={styles.confidence}>
          <span className={styles.confidenceLabel}>Confianza:</span>
          <span className={styles.confidenceValue}>
            {(confidence * 100).toFixed(0)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default StatusBadge;
