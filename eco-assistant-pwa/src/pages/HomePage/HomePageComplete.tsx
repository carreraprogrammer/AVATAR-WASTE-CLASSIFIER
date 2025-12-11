/**
 * Home Page Component (Complete Workflow)
 * Full classification workflow with camera, detection, voice, and avatar
 */

import React, { useState, useCallback, useEffect } from 'react';
import { KioskLayout } from '@/templates/KioskLayout';
import { AvatarController } from '@/organisms/AvatarController';
import { ClassificationResult } from '@/organisms/ClassificationResult';
import { CameraView } from '@/molecules/CameraView';
import { Badge } from '@/atoms/Badge';
import { useClassification, useVoice, useIdleTimer } from '@/hooks';
import { useClassification as useClassificationState, useClassificationActions } from '@/store';
import type { ClassificationState } from '@/types';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  const [classificationState, setClassificationState] =
    useState<ClassificationState>('idle');
  const [showCamera, setShowCamera] = useState(true);

  const classification = useClassificationState();
  const { resetClassification } = useClassificationActions();
  const { classify, isClassifying } = useClassification();
  const {
    speakWelcome,
    speakAnalyzing,
    speakSuccess,
    speakEducationalTip,
    speakError
  } = useVoice();

  // Auto-reset after 15 seconds of inactivity
  const { resetTimer } = useIdleTimer({
    timeout: 15000,
    onTimeout: handleReset,
    enabled: classificationState === 'success'
  });

  // Welcome message on mount
  useEffect(() => {
    speakWelcome();
  }, []);

  // Handle waste detected from camera
  const handleWasteDetected = useCallback(
    async (imageBase64: string) => {
      try {
        console.log('[HomePage] Waste detected, starting classification...');

        setClassificationState('classifying');
        setShowCamera(false);
        speakAnalyzing();

        // Classify the image
        const result = await classify(imageBase64);

        console.log('[HomePage] Classification successful:', result);

        setClassificationState('success');

        // Speak result and educational tip
        await speakSuccess(result.material);
        setTimeout(() => {
          speakEducationalTip(result.material);
        }, 2000);

        // Reset timer
        resetTimer();
      } catch (error) {
        console.error('[HomePage] Classification failed:', error);
        setClassificationState('error');
        speakError('apiError');

        // Auto-retry after error
        setTimeout(() => {
          handleReset();
        }, 5000);
      }
    },
    [
      classify,
      speakAnalyzing,
      speakSuccess,
      speakEducationalTip,
      speakError,
      resetTimer
    ]
  );

  // Handle camera error
  const handleCameraError = useCallback(
    (error: Error) => {
      console.error('[HomePage] Camera error:', error);
      setClassificationState('error');
      speakError('apiError');
    },
    [speakError]
  );

  // Reset to idle state
  function handleReset() {
    console.log('[HomePage] Resetting to idle state');
    setClassificationState('idle');
    setShowCamera(true);
    resetClassification();
  }

  // Handle "Ask More" button (future: open conversation panel)
  function handleAskMore() {
    console.log('[HomePage] Ask more clicked');
    // TODO: Open conversation panel with ElevenLabs Conversational AI
    alert('Conversación interactiva - Próximamente');
  }

  return (
    <KioskLayout>
      <div className={styles.homePageComplete}>
        {/* Avatar Controller */}
        <div className={styles.avatarSection}>
          <AvatarController
            classificationState={classificationState}
            material={classification?.material}
            className={styles.avatarController}
          />
        </div>

        {/* Main Content Area */}
        <div className={styles.contentSection}>
          {/* Camera View (when idle or detecting) */}
          {showCamera && (
            <div className={styles.cameraSection}>
              <CameraView
                onWasteDetected={handleWasteDetected}
                onError={handleCameraError}
                isActive={classificationState === 'idle'}
                className={styles.camera}
              />
            </div>
          )}

          {/* Classification Result (when success) */}
          {classificationState === 'success' && classification && (
            <div className={styles.resultSection}>
              <ClassificationResult
                material={classification.material}
                color={classification.color}
                confidence={classification.confidence}
                message={classification.message}
                onAskMore={handleAskMore}
                onReset={handleReset}
                className={styles.classificationResult}
              />
            </div>
          )}

          {/* Error State */}
          {classificationState === 'error' && (
            <div className={styles.errorSection}>
              <p className={styles.errorMessage}>
                Hubo un problema. Reintentando...
              </p>
            </div>
          )}
        </div>

        {/* Status Badge */}
        <div className={styles.statusBadge}>
          <Badge
            variant={
              classificationState === 'success'
                ? 'success'
                : classificationState === 'error'
                ? 'error'
                : 'info'
            }
            size="small"
          >
            {classificationState === 'idle' && 'Esperando residuo...'}
            {classificationState === 'detecting' && 'Detectando...'}
            {classificationState === 'classifying' && 'Clasificando...'}
            {classificationState === 'success' && '✓ Clasificado'}
            {classificationState === 'error' && '⚠ Error'}
          </Badge>
        </div>
      </div>
    </KioskLayout>
  );
};

export default HomePage;
