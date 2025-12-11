/**
 * Zustand Store Types
 * Types for state management slices
 */

import type {
  Classification,
  ClassificationState,
  Material
} from './classification.types';
import type { AvatarState, AvatarEmotion } from './avatar.types';
import type { AppConfig } from './config.types';

// Classification Slice
export interface ClassificationSlice {
  // State
  classification: Classification | null;
  isClassifying: boolean;
  error: Error | null;
  history: Classification[];

  // Actions
  startClassification: () => void;
  setClassification: (classification: Classification) => void;
  setClassificationError: (error: Error) => void;
  resetClassification: () => void;
}

// Avatar Slice
export interface AvatarSlice {
  // State
  avatarState: AvatarState;
  backgroundColor: string;
  emotion: AvatarEmotion;

  // Actions
  setAvatarState: (state: AvatarState) => void;
  setBackgroundColor: (color: string) => void;
  setEmotion: (emotion: AvatarEmotion) => void;
}

// Camera Slice
export interface CameraSlice {
  // State
  stream: MediaStream | null;
  isActive: boolean;
  isCameraReady: boolean;
  cameraError: Error | null;
  lastDetection: Date | null;

  // Actions
  setStream: (stream: MediaStream | null) => void;
  setIsActive: (active: boolean) => void;
  setCameraReady: (ready: boolean) => void;
  setCameraError: (error: Error | null) => void;
  setLastDetection: (date: Date) => void;
}

// Config Slice
export interface ConfigSlice {
  // State
  config: AppConfig;

  // Actions
  updateConfig: (updates: Partial<AppConfig>) => void;
  resetConfig: () => void;
}

// Combined Store State
export interface StoreState
  extends ClassificationSlice,
    AvatarSlice,
    CameraSlice,
    ConfigSlice {}
