/**
 * ClassificationCard Molecule
 * Card displaying classification result with educational content
 */

import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { EDUCATIONAL_TIPS } from '@/constants';
import type { ClassificationCardProps } from '@/types';
import styles from './ClassificationCard.module.css';

export const ClassificationCard: React.FC<ClassificationCardProps> = ({
  material,
  color,
  confidence,
  message,
  educational,
  className = ''
}) => {
  // Get a random educational tip if not provided
  const tip =
    educational ||
    EDUCATIONAL_TIPS[material]?.[
      Math.floor(Math.random() * EDUCATIONAL_TIPS[material].length)
    ];

  return (
    <IonCard className={`${styles.card} ${className}`}>
      <IonCardHeader className={styles.header}>
        <IonCardTitle className={styles.title}>Resultado</IonCardTitle>
      </IonCardHeader>

      <IonCardContent className={styles.content}>
        {/* Main message */}
        {message && <p className={styles.message}>{message}</p>}

        {/* Container color info */}
        <div className={styles.containerInfo}>
          <span className={styles.label}>Contenedor:</span>
          <span className={styles.containerColor}>{color}</span>
        </div>

        {/* Confidence */}
        {confidence !== undefined && (
          <div className={styles.confidenceContainer}>
            <span className={styles.label}>Confianza:</span>
            <div className={styles.confidenceBar}>
              <div
                className={styles.confidenceFill}
                style={{ width: `${confidence * 100}%` }}
              />
            </div>
            <span className={styles.confidenceText}>
              {(confidence * 100).toFixed(0)}%
            </span>
          </div>
        )}

        {/* Educational tip */}
        {tip && (
          <div className={styles.educationalTip}>
            <div className={styles.tipIcon}>💡</div>
            <p className={styles.tipText}>{tip}</p>
          </div>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default ClassificationCard;
