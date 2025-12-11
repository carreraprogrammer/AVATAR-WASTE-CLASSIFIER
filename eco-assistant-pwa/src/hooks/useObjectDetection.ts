/**
 * useObjectDetection Hook
 * Manages TensorFlow.js object detection
 */

import { useState, useCallback, useEffect } from 'react';
import { objectDetectionService } from '@/services';
import type { DetectionResult, WasteDetection } from '@/types';
import { useConfig } from '@/store';

export const useObjectDetection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [detections, setDetections] = useState<DetectionResult[]>([]);
  const config = useConfig();

  // Load model on mount
  useEffect(() => {
    if (config.detectionSettings?.confidenceThreshold) {
      objectDetectionService.loadModel().catch((err) => {
        console.error('[useObjectDetection] Failed to load model:', err);
        setError(err);
      });
    }

    return () => {
      // Cleanup: dispose model on unmount
      objectDetectionService.dispose();
    };
  }, [config.detectionSettings]);

  /**
   * Detect objects in video/image element
   */
  const detectObjects = useCallback(
    async (
      input: HTMLVideoElement | HTMLImageElement
    ): Promise<DetectionResult[]> => {
      try {
        setIsLoading(true);
        setError(null);

        const results = await objectDetectionService.detect(input);
        setDetections(results);

        return results;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('Detection failed');
        setError(error);
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Detect waste-like objects in video/image
   */
  const detectWaste = useCallback(
    async (
      input: HTMLVideoElement | HTMLImageElement
    ): Promise<WasteDetection> => {
      try {
        setIsLoading(true);
        setError(null);

        const confidenceThreshold =
          config.detectionSettings?.confidenceThreshold || 0.6;

        const result = await objectDetectionService.detectWaste(
          input,
          confidenceThreshold
        );

        if (result.success) {
          setDetections(result.detections);
        }

        return result;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('Waste detection failed');
        setError(error);
        return {
          success: false,
          detections: [],
          error: error.message
        };
      } finally {
        setIsLoading(false);
      }
    },
    [config.detectionSettings]
  );

  return {
    detectObjects,
    detectWaste,
    detections,
    isLoading,
    error
  };
};
