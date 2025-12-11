/**
 * useClassification Hook
 * Manages waste classification via N8N API
 */

import { useCallback } from 'react';
import { n8nService } from '@/services';
import {
  useClassificationActions,
  useIsClassifying,
  useClassificationError,
  useConfig
} from '@/store';
import type { Classification } from '@/types';

export const useClassification = () => {
  const { startClassification, setClassification, setClassificationError } =
    useClassificationActions();
  const isClassifying = useIsClassifying();
  const error = useClassificationError();
  const config = useConfig();

  /**
   * Classify waste image via N8N Fast Path
   * @param imageBase64 Base64 encoded image
   * @returns Classification result
   */
  const classify = useCallback(
    async (imageBase64: string): Promise<Classification> => {
      try {
        startClassification();

        // Generate trace ID
        const traceId = crypto.randomUUID();

        // Call N8N Fast Path
        const response = await n8nService.classifyWaste({
          image_base64: imageBase64,
          tenant_id: config.tenantId,
          trace_id: traceId,
          station_id: config.stationId,
          organization_id: config.organizationId
        });

        if (!response.success) {
          throw new Error(response.error || 'Classification failed');
        }

        // Build classification object
        const classification: Classification = {
          material: response.material,
          color: response.color,
          confidence: response.confidence,
          message: response.message,
          recyclable: true, // Assume recyclable unless OTHER
          timestamp: new Date().toISOString(),
          trace_id: traceId
        };

        // Update store
        setClassification(classification);

        return classification;
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error('Classification failed');
        setClassificationError(error);
        throw error;
      }
    },
    [
      config,
      startClassification,
      setClassification,
      setClassificationError
    ]
  );

  return {
    classify,
    isClassifying,
    error
  };
};
