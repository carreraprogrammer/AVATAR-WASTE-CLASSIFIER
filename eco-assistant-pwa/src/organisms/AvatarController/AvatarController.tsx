/**
 * AvatarController Organism
 * Manages avatar state and background color synchronization
 */

import React, { useEffect } from 'react';
import { AvatarRive } from '@/atoms/Avatar';
import { useAvatarActions, useAvatarState, useBackgroundColor } from '@/store';
import { getMaterialColor } from '@/utils';
import type { AvatarControllerProps } from '@/types';
import styles from './AvatarController.module.css';

export const AvatarController: React.FC<AvatarControllerProps> = ({
  classificationState,
  material,
  className = ''
}) => {
  const { setAvatarState, setBackgroundColor } = useAvatarActions();
  const avatarState = useAvatarState();
  const backgroundColor = useBackgroundColor();

  // Map classification state to avatar state
  useEffect(() => {
    switch (classificationState) {
      case 'idle':
        setAvatarState('idle');
        break;
      case 'detecting':
        setAvatarState('analyzing');
        break;
      case 'classifying':
        setAvatarState('analyzing');
        break;
      case 'success':
        setAvatarState('success');
        break;
      case 'error':
        setAvatarState('error');
        break;
      default:
        setAvatarState('idle');
    }
  }, [classificationState, setAvatarState]);

  // Update background color when material changes
  useEffect(() => {
    if (material) {
      const color = getMaterialColor(material);
      setBackgroundColor(color);
    } else if (classificationState === 'idle') {
      // Reset to neutral when idle
      setBackgroundColor('#F5F5F5');
    }
  }, [material, classificationState, setBackgroundColor]);

  return (
    <div className={`${styles.controller} ${className}`}>
      <AvatarRive
        state={avatarState}
        backgroundColor={backgroundColor}
        className={styles.avatar}
      />
    </div>
  );
};

export default AvatarController;
