/**
 * Component Prop Types
 * TypeScript interfaces for all component props
 */

import type { ReactNode } from 'react';
import type {
  Material,
  ContainerColor,
  Classification,
  ClassificationState
} from './classification.types';
import type { AvatarState, AvatarEmotion } from './avatar.types';

// Atom Components

export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

// Molecule Components

export interface CameraViewProps {
  onWasteDetected?: (imageBase64: string) => void;
  onError?: (error: Error) => void;
  isActive?: boolean;
  className?: string;
}

export interface StatusBadgeProps {
  material: Material;
  confidence?: number;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export interface VoiceFeedbackProps {
  message: string;
  onComplete?: () => void;
  showSubtitles?: boolean;
  autoPlay?: boolean;
  className?: string;
}

export interface ClassificationCardProps {
  material: Material;
  color: ContainerColor;
  confidence: number;
  message?: string;
  educational?: string;
  className?: string;
}

export interface ProgressIndicatorProps {
  progress: number;
  status?: string;
  className?: string;
}

// Organism Components

export interface ClassificationResultProps {
  material: Material;
  color: ContainerColor;
  confidence: number;
  message: string;
  educational?: string;
  onAskMore?: () => void;
  onReset?: () => void;
  className?: string;
}

export interface ConversationPanelProps {
  classification: Classification | null;
  onClose: () => void;
  className?: string;
}

export interface AvatarControllerProps {
  classificationState: ClassificationState;
  material?: Material;
  className?: string;
}

export interface ScanWorkflowProps {
  onComplete?: (classification: Classification) => void;
  onError?: (error: Error) => void;
  className?: string;
}

// Template Components

export interface KioskLayoutProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
  className?: string;
}

export interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

// Page Components (typically don't have props, but included for completeness)
export interface PageProps {
  className?: string;
}
