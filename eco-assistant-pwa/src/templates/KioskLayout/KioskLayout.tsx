/**
 * Kiosk Layout Template
 * Main layout wrapper for kiosk mode
 */

import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import type { KioskLayoutProps } from '@/types';
import styles from './KioskLayout.module.css';

export const KioskLayout: React.FC<KioskLayoutProps> = ({
  children,
  className = ''
}) => {
  return (
    <IonPage className={`${styles.kioskPage} ${className}`}>
      <IonContent className={styles.content} fullscreen scrollY={false}>
        <div className={styles.container}>{children}</div>
      </IonContent>
    </IonPage>
  );
};

export default KioskLayout;
