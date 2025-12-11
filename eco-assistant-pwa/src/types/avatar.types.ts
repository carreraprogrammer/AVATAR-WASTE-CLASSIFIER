/**
 * Avatar Types
 * Types for Rive avatar states, emotions, and animations
 */

export type AvatarState =
  | 'idle'      // Waiting, subtle breathing
  | 'welcome'   // Greeting user
  | 'analyzing' // Concentrating on waste
  | 'success'   // Celebrating correct classification
  | 'error'     // Confused, needs help
  | 'speaking'; // Mouth animated with voice

export type AvatarEmotion =
  | 'neutral'
  | 'happy'
  | 'excited'
  | 'confused'
  | 'thinking';

export interface AvatarProps {
  state?: AvatarState;
  backgroundColor?: string;
  emotion?: AvatarEmotion;
  className?: string;
}

export interface AvatarAnimation {
  eyeState: number;      // 0: open, 1: squinted, 2: confused
  mouthState: number;    // 0: neutral, 1: frown, 2: smile, 3: animated
  headTilt?: number;     // Degrees of head tilt
  blinkRate?: number;    // Blink frequency (0-1)
  breathScale?: number;  // Scale factor for breathing animation
  breathDuration?: number; // Duration of breath cycle in ms
}

export interface RiveStateMachineInput {
  name: string;
  value: number | boolean;
}
