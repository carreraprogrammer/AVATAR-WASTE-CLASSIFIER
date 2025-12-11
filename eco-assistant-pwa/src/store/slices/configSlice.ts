/**
 * Config Slice
 * State management for app configuration (persisted)
 */

import type { StateCreator } from 'zustand';
import type { StoreState, ConfigSlice } from '@/types/store.types';
import type { AppConfig } from '@/types';
import { DEFAULT_CONFIG } from '@/constants';

export const configSlice: StateCreator<
  StoreState,
  [],
  [],
  ConfigSlice
> = (set) => ({
  // State
  config: DEFAULT_CONFIG,

  // Actions
  updateConfig: (updates: Partial<AppConfig>) =>
    set((state) => ({
      config: { ...state.config, ...updates }
    })),

  resetConfig: () =>
    set({
      config: DEFAULT_CONFIG
    })
});
