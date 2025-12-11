/**
 * Avatar Slice
 * State management for Rive avatar state and animations
 */

import type { StateCreator } from 'zustand';
import type { StoreState, AvatarSlice } from '@/types/store.types';
import type { AvatarState, AvatarEmotion } from '@/types';

export const avatarSlice: StateCreator<
  StoreState,
  [],
  [],
  AvatarSlice
> = (set) => ({
  // State
  avatarState: 'idle',
  backgroundColor: '#F5F5F5', // Default neutral gray
  emotion: 'neutral',

  // Actions
  setAvatarState: (avatarState: AvatarState) =>
    set({ avatarState }),

  setBackgroundColor: (backgroundColor: string) =>
    set({ backgroundColor }),

  setEmotion: (emotion: AvatarEmotion) =>
    set({ emotion })
});
