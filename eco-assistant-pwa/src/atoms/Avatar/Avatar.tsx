/**
 * Avatar Atom Component (Simplified)
 * Placeholder for Rive avatar - will be enhanced later
 */

import React from 'react';
import type { AvatarProps } from '@/types';
import styles from './Avatar.module.css';

export const Avatar: React.FC<AvatarProps> = ({
  state = 'idle',
  backgroundColor = '#F5F5F5',
  className = ''
}) => {
  // Simple emoji-based avatar for MVP
  const getEmoji = () => {
    switch (state) {
      case 'analyzing':
        return '🔍';
      case 'success':
        return '🎉';
      case 'error':
        return '😕';
      case 'speaking':
        return '💬';
      default:
        return '♻️';
    }
  };

  return (
    <div
      className={`${styles.avatar} ${className}`}
      style={{ backgroundColor }}
    >
      <div className={styles.emoji}>{getEmoji()}</div>
      <div className={styles.label}>EcoAssistant</div>
    </div>
  );
};

export default Avatar;
