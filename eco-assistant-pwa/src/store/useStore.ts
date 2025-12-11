/**
 * Main Zustand Store
 * Combines all slices with devtools and persist middleware
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  classificationSlice,
  avatarSlice,
  cameraSlice,
  configSlice
} from './slices';
import type { StoreState } from '@/types';

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        // Combine all slices
        ...classificationSlice(set, get),
        ...avatarSlice(set, get),
        ...cameraSlice(set, get),
        ...configSlice(set, get)
      }),
      {
        name: 'eco-assistant-storage',
        // Only persist config slice
        partialize: (state) => ({
          config: state.config
        })
      }
    ),
    {
      name: 'EcoAssistant Store',
      enabled: import.meta.env.DEV // Enable devtools only in development
    }
  )
);

// Selector hooks for optimized re-renders
export const useClassification = () =>
  useStore((state) => state.classification);

export const useIsClassifying = () =>
  useStore((state) => state.isClassifying);

export const useClassificationError = () =>
  useStore((state) => state.error);

export const useClassificationHistory = () =>
  useStore((state) => state.history);

export const useAvatarState = () =>
  useStore((state) => state.avatarState);

export const useBackgroundColor = () =>
  useStore((state) => state.backgroundColor);

export const useAvatarEmotion = () =>
  useStore((state) => state.emotion);

export const useCameraStream = () =>
  useStore((state) => state.stream);

export const useIsCameraActive = () =>
  useStore((state) => state.isActive);

export const useIsCameraReady = () =>
  useStore((state) => state.isCameraReady);

export const useCameraError = () =>
  useStore((state) => state.cameraError);

export const useConfig = () =>
  useStore((state) => state.config);

// Action selectors
export const useClassificationActions = () =>
  useStore((state) => ({
    startClassification: state.startClassification,
    setClassification: state.setClassification,
    setClassificationError: state.setClassificationError,
    resetClassification: state.resetClassification
  }));

export const useAvatarActions = () =>
  useStore((state) => ({
    setAvatarState: state.setAvatarState,
    setBackgroundColor: state.setBackgroundColor,
    setEmotion: state.setEmotion
  }));

export const useCameraActions = () =>
  useStore((state) => ({
    setStream: state.setStream,
    setIsActive: state.setIsActive,
    setCameraReady: state.setCameraReady,
    setCameraError: state.setCameraError,
    setLastDetection: state.setLastDetection
  }));

export const useConfigActions = () =>
  useStore((state) => ({
    updateConfig: state.updateConfig,
    resetConfig: state.resetConfig
  }));
