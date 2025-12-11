/**
 * CameraView Molecule
 * Camera feed with object detection and auto-capture
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { IonSpinner } from '@ionic/react';
import { useCamera, useObjectDetection } from '@/hooks';
import { useCameraStream, useCameraActions, useConfig } from '@/store';
import type { CameraViewProps } from '@/types';
import styles from './CameraView.module.css';

export const CameraView: React.FC<CameraViewProps> = ({
  onWasteDetected,
  onError,
  isActive = true,
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const config = useConfig();
  const stream = useCameraStream();
  const { setCameraError } = useCameraActions();
  const { startCamera, stopCamera } = useCamera();
  const { detectWaste, detections } = useObjectDetection();

  // Start/stop camera based on isActive
  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [isActive, startCamera, stopCamera]);

  // Connect stream to video element
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current
          ?.play()
          .then(() => {
            setIsLoading(false);
            console.log('[CameraView] Video playing successfully');
          })
          .catch((error) => {
            console.error('[CameraView] Video play error:', error);
            setIsLoading(false);
            onError?.(error);
          });
      };
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [stream, onError]);

  // Object detection loop
  useEffect(() => {
    if (!stream || !isActive || !videoRef.current || isLoading) return;

    let frameId: number;
    let lastDetectionTime = 0;
    const detectionInterval = config.detectionSettings?.captureDelay || 500;

    const detectLoop = async () => {
      const video = videoRef.current;
      const now = Date.now();

      if (
        !video ||
        video.readyState !== video.HAVE_ENOUGH_DATA ||
        now - lastDetectionTime < detectionInterval
      ) {
        frameId = requestAnimationFrame(detectLoop);
        return;
      }

      try {
        // Run waste detection
        const result = await detectWaste(video);

        if (result.success && result.croppedImage) {
          console.log('[CameraView] Waste detected!', result.detections);
          lastDetectionTime = now;

          // Notify parent component
          onWasteDetected?.(result.croppedImage);

          // Pause detection briefly to avoid rapid re-detection
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      } catch (error) {
        console.error('[CameraView] Detection error:', error);
      }

      frameId = requestAnimationFrame(detectLoop);
    };

    frameId = requestAnimationFrame(detectLoop);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [
    stream,
    isActive,
    isLoading,
    detectWaste,
    onWasteDetected,
    config.detectionSettings
  ]);

  // Draw detection boxes on canvas
  useEffect(() => {
    if (!canvasRef.current || !videoRef.current || detections.length === 0)
      return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Match canvas size to video
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw detection boxes
    detections.forEach((detection) => {
      const [x, y, width, height] = detection.bbox;

      // Draw bounding box
      ctx.strokeStyle = '#28a745';
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, width, height);

      // Draw label background
      ctx.fillStyle = '#28a745';
      const label = `${detection.class} (${(detection.score * 100).toFixed(
        0
      )}%)`;
      const textMetrics = ctx.measureText(label);
      ctx.fillRect(x, y - 25, textMetrics.width + 10, 25);

      // Draw label text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Arial';
      ctx.fillText(label, x + 5, y - 7);
    });
  }, [detections]);

  // Handle camera errors
  const handleVideoError = useCallback(
    (error: Event) => {
      console.error('[CameraView] Video error:', error);
      const err = new Error('Camera access failed');
      setCameraError(err);
      onError?.(err);
      setIsLoading(false);
    },
    [setCameraError, onError]
  );

  if (isLoading) {
    return (
      <div className={`${styles.cameraView} ${styles.loading} ${className}`}>
        <IonSpinner name="crescent" className={styles.spinner} />
        <p className={styles.loadingText}>Iniciando cámara...</p>
      </div>
    );
  }

  return (
    <div className={`${styles.cameraView} ${className}`}>
      <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={styles.video}
          onError={handleVideoError}
        />
        <canvas ref={canvasRef} className={styles.canvas} />

        {detections.length > 0 && (
          <div className={styles.detectionIndicator}>
            <span className={styles.detectionDot} />
            <span>Objeto detectado</span>
          </div>
        )}
      </div>

      <div className={styles.instructions}>
        <p>Acerca el residuo a la cámara</p>
      </div>
    </div>
  );
};

export default CameraView;
