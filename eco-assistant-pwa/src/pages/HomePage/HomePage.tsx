/**
 * Home Page Component
 * Main kiosk screen with classification workflow
 */

import React, { useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { KioskLayout } from '@/templates/KioskLayout';
import { Avatar } from '@/atoms/Avatar';
import { Button } from '@/atoms/Button';
import { Badge } from '@/atoms/Badge';
import { Spinner } from '@/atoms/Spinner';
import { useClassification } from '@/hooks';
import { useAvatarActions, useBackgroundColor } from '@/store';
import { getMaterialColor } from '@/utils';
import type { AvatarState } from '@/types';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  const [avatarState, setLocalAvatarState] = useState<AvatarState>('idle');
  const { setBackgroundColor } = useAvatarActions();
  const backgroundColor = useBackgroundColor();
  const { classify, isClassifying } = useClassification();
  const [result, setResult] = useState<string | null>(null);

  // Simulate classification for MVP demo
  const handleClassify = async () => {
    try {
      setLocalAvatarState('analyzing');
      setResult(null);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock classification result
      const mockMaterial = 'PLASTIC';
      const mockColor = getMaterialColor(mockMaterial);

      setBackgroundColor(mockColor);
      setLocalAvatarState('success');
      setResult(`Material: ${mockMaterial}\nColor: AZUL\nConfidence: 95%`);
    } catch (error) {
      setLocalAvatarState('error');
      setResult('Error: Classification failed');
    }
  };

  const handleReset = () => {
    setLocalAvatarState('idle');
    setBackgroundColor('#F5F5F5');
    setResult(null);
  };

  return (
    <KioskLayout>
      <div className={styles.homePage}>
        {/* Avatar Section */}
        <div className={styles.avatarSection}>
          <Avatar
            state={avatarState}
            backgroundColor={backgroundColor}
            className={styles.avatar}
          />
        </div>

        {/* Instructions */}
        <div className={styles.instructions}>
          <h2>Clasificador de Residuos con IA</h2>
          <p>
            Presiona "Clasificar" para simular la detección y clasificación de
            un residuo.
          </p>
        </div>

        {/* Action Button */}
        <div className={styles.actions}>
          {isClassifying || avatarState === 'analyzing' ? (
            <div className={styles.loadingContainer}>
              <Spinner size="large" />
              <p>Analizando...</p>
            </div>
          ) : result ? (
            <div className={styles.resultContainer}>
              <IonCard className={styles.resultCard}>
                <IonCardHeader>
                  <IonCardTitle>Resultado</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <pre className={styles.resultText}>{result}</pre>
                  <div className={styles.resultActions}>
                    <Button variant="primary" onClick={handleReset}>
                      Nuevo Escaneo
                    </Button>
                  </div>
                </IonCardContent>
              </IonCard>
            </div>
          ) : (
            <Button
              variant="primary"
              size="large"
              onClick={handleClassify}
              icon={<span>📷</span>}
            >
              Clasificar Residuo
            </Button>
          )}
        </div>

        {/* Info Badge */}
        <div className={styles.infoBadge}>
          <Badge variant="info" size="small">
            MVP Demo - EcoAssistant Kiosk
          </Badge>
        </div>
      </div>
    </KioskLayout>
  );
};

export default HomePage;
