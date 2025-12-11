/**
 * useVoice Hook
 * Manages voice synthesis and feedback
 */

import { useCallback } from 'react';
import { ttsService } from '@/services';
import { useConfig } from '@/store';
import type { Material } from '@/types';

export const useVoice = () => {
  const config = useConfig();

  const speakWelcome = useCallback(async () => {
    if (!config.enableVoice) return;
    await ttsService.speakWelcome();
  }, [config.enableVoice]);

  const speakAnalyzing = useCallback(async () => {
    if (!config.enableVoice) return;
    await ttsService.speakAnalyzing();
  }, [config.enableVoice]);

  const speakSuccess = useCallback(
    async (material: Material) => {
      if (!config.enableVoice) return;
      await ttsService.speakSuccess(material);
    },
    [config.enableVoice]
  );

  const speakEducationalTip = useCallback(
    async (material: Material) => {
      if (!config.enableVoice) return;
      await ttsService.speakEducationalTip(material);
    },
    [config.enableVoice]
  );

  const speakError = useCallback(
    async (errorType: 'noWaste' | 'lowConfidence' | 'apiError') => {
      if (!config.enableVoice) return;
      await ttsService.speakError(errorType);
    },
    [config.enableVoice]
  );

  const speak = useCallback(
    async (text: string) => {
      if (!config.enableVoice) return;
      await ttsService.speak(text);
    },
    [config.enableVoice]
  );

  const stop = useCallback(() => {
    ttsService.stop();
  }, []);

  return {
    speakWelcome,
    speakAnalyzing,
    speakSuccess,
    speakEducationalTip,
    speakError,
    speak,
    stop,
    isEnabled: config.enableVoice
  };
};
