/**
 * useCamera Hook
 * Manages camera access and stream
 */

import { useEffect, useCallback } from 'react';
import { useCameraActions, useConfig } from '@/store';

export const useCamera = () => {
  const { setStream, setCameraReady, setCameraError, setIsActive } =
    useCameraActions();
  const config = useConfig();

  /**
   * Start camera stream
   */
  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      setIsActive(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: config.cameraSettings?.resolution.width || 640,
          height: config.cameraSettings?.resolution.height || 480,
          frameRate: config.cameraSettings?.frameRate || 30,
          facingMode: config.cameraSettings?.facingMode || 'environment'
        },
        audio: false
      });

      setStream(stream);
      setCameraReady(true);
      console.log('[useCamera] Camera started successfully');
    } catch (error) {
      console.error('[useCamera] Failed to start camera:', error);
      const err =
        error instanceof Error
          ? error
          : new Error('Failed to access camera');
      setCameraError(err);
      setCameraReady(false);
    }
  }, [
    config.cameraSettings,
    setStream,
    setCameraReady,
    setCameraError,
    setIsActive
  ]);

  /**
   * Stop camera stream
   */
  const stopCamera = useCallback(() => {
    setStream(null);
    setCameraReady(false);
    setIsActive(false);
    console.log('[useCamera] Camera stopped');
  }, [setStream, setCameraReady, setIsActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    startCamera,
    stopCamera
  };
};
