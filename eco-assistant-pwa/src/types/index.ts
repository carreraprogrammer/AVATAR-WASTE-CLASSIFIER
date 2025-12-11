/**
 * Central Type Exports
 * Re-exports all types for easy importing
 */

// Classification Types
export type {
  Material,
  ContainerColor,
  ClassificationState,
  Classification,
  ClassificationRequest,
  ClassificationResponse,
  DetectionResult,
  WasteDetection
} from './classification.types';

// Avatar Types
export type {
  AvatarState,
  AvatarEmotion,
  AvatarProps,
  AvatarAnimation,
  RiveStateMachineInput
} from './avatar.types';

// API Types
export type {
  N8NClassificationRequest,
  N8NClassificationResponse,
  ScanCreateRequest,
  ScanResponse,
  ClassificationCorrectionRequest,
  ClassificationCorrectionResponse,
  APIError,
  APIResponse
} from './api.types';

// Config Types
export type {
  AppConfig,
  VoiceSettings,
  CameraSettings,
  DetectionSettings,
  FeatureFlags
} from './config.types';

// Store Types
export type {
  StoreState,
  ClassificationSlice,
  AvatarSlice,
  CameraSlice,
  ConfigSlice
} from './store.types';

// Component Prop Types
export type {
  ButtonProps,
  BadgeProps,
  SpinnerProps,
  CameraViewProps,
  StatusBadgeProps,
  VoiceFeedbackProps,
  ClassificationCardProps,
  ClassificationResultProps,
  ConversationPanelProps,
  AvatarControllerProps,
  ScanWorkflowProps,
  KioskLayoutProps,
  AdminLayoutProps
} from './component.types';
