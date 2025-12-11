/**
 * Configuration Types
 * Types for app config, tenant settings, and feature flags
 */

export interface AppConfig {
  tenantId: string;
  stationId: string;
  organizationId: string;
  enableVoice: boolean;
  enableConversation: boolean;
  idleTimeout: number; // milliseconds
  language: 'es' | 'en';
  voiceSettings?: VoiceSettings;
  cameraSettings?: CameraSettings;
  detectionSettings?: DetectionSettings;
}

export interface VoiceSettings {
  voiceId: string;
  model: string;
  stability: number;
  similarityBoost: number;
  style: number;
  useSpeakerBoost: boolean;
}

export interface CameraSettings {
  resolution: {
    width: number;
    height: number;
  };
  frameRate: number;
  facingMode: 'user' | 'environment';
}

export interface DetectionSettings {
  modelUrl?: string;
  confidenceThreshold: number;
  wasteCategories: string[];
  autoCapture: boolean;
  captureDelay: number; // milliseconds
}

export interface FeatureFlags {
  enableObjectDetection: boolean;
  enableBackgroundValidation: boolean;
  enableVoiceFeedback: boolean;
  enableConversation: boolean;
  enableAnalytics: boolean;
  enableOfflineMode: boolean;
}
