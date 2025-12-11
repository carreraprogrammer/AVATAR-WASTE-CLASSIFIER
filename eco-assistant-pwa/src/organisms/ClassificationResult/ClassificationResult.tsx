/**
 * ClassificationResult Organism
 * Complete classification result with actions
 */

import React from 'react';
import { StatusBadge } from '@/molecules/StatusBadge';
import { ClassificationCard } from '@/molecules/ClassificationCard';
import { Button } from '@/atoms/Button';
import type { ClassificationResultProps } from '@/types';
import styles from './ClassificationResult.module.css';

export const ClassificationResult: React.FC<ClassificationResultProps> = ({
  material,
  color,
  confidence,
  message,
  educational,
  onAskMore,
  onReset,
  className = ''
}) => {
  return (
    <div className={`${styles.result} ${className}`}>
      {/* Material Badge */}
      <div className={styles.badgeSection}>
        <StatusBadge material={material} confidence={confidence} size="large" />
      </div>

      {/* Classification Details */}
      <div className={styles.cardSection}>
        <ClassificationCard
          material={material}
          color={color}
          confidence={confidence}
          message={message}
          educational={educational}
        />
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        {onAskMore && (
          <Button
            variant="primary"
            size="large"
            onClick={onAskMore}
            icon={<span>💬</span>}
            className={styles.actionButton}
          >
            Preguntar más
          </Button>
        )}

        {onReset && (
          <Button
            variant="secondary"
            size="large"
            onClick={onReset}
            icon={<span>🔄</span>}
            className={styles.actionButton}
          >
            Nuevo escaneo
          </Button>
        )}
      </div>
    </div>
  );
};

export default ClassificationResult;
