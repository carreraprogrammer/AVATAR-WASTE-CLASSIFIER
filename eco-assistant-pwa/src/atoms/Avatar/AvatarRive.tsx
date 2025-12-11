/**
 * Avatar with Rive Integration
 * Animated avatar with emotional states
 */

import React, { useEffect, useRef } from 'react';
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import type { AvatarProps } from '@/types';
import styles from './Avatar.module.css';

export const AvatarRive: React.FC<AvatarProps> = ({
  state = 'idle',
  backgroundColor = '#F5F5F5',
  emotion,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize Rive
  const { rive, RiveComponent } = useRive({
    src: '/avatar.riv',
    stateMachines: 'State Machine',
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center
    }),
    autoplay: true,
    onLoadError: (error) => {
      console.error('[Avatar] Failed to load Rive animation:', error);
    },
    onLoad: () => {
      console.log('[Avatar] Rive animation loaded successfully');
    }
  });

  // Get state machine inputs
  const eyeStateInput = useStateMachineInput(
    rive,
    'State Machine',
    'eyeState'
  );
  const mouthStateInput = useStateMachineInput(
    rive,
    'State Machine',
    'mouthState'
  );
  const bgColorInput = useStateMachineInput(
    rive,
    'State Machine',
    'backgroundColor'
  );

  // Update avatar state based on classification state
  useEffect(() => {
    if (!eyeStateInput || !mouthStateInput) return;

    const stateMap = {
      idle: { eye: 0, mouth: 0 },       // Open eyes, neutral mouth
      welcome: { eye: 0, mouth: 2 },    // Open eyes, smile
      analyzing: { eye: 1, mouth: 0 },  // Squinted eyes, neutral mouth
      success: { eye: 0, mouth: 2 },    // Open eyes, big smile
      error: { eye: 2, mouth: 1 },      // Confused eyes, frown
      speaking: { eye: 0, mouth: 3 }    // Open eyes, animated mouth
    };

    const config = stateMap[state] || stateMap.idle;
    eyeStateInput.value = config.eye;
    mouthStateInput.value = config.mouth;

    console.log(`[Avatar] State changed to: ${state} (eye: ${config.eye}, mouth: ${config.mouth})`);
  }, [state, eyeStateInput, mouthStateInput]);

  // Update background color
  useEffect(() => {
    if (!bgColorInput || !backgroundColor) return;

    // Convert hex to number for Rive
    const hexValue = backgroundColor.replace('#', '');
    const colorValue = parseInt(hexValue, 16);

    bgColorInput.value = colorValue;
    console.log(`[Avatar] Background color changed to: ${backgroundColor}`);
  }, [backgroundColor, bgColorInput]);

  return (
    <div
      ref={containerRef}
      className={`${styles.avatarRive} ${className}`}
      style={{ backgroundColor }}
    >
      <RiveComponent className={styles.riveCanvas} />
    </div>
  );
};

export default AvatarRive;
