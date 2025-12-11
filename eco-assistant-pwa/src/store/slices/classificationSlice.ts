/**
 * Classification Slice
 * State management for waste classification
 */

import type { StateCreator } from 'zustand';
import type { StoreState, ClassificationSlice } from '@/types/store.types';
import type { Classification } from '@/types';

export const classificationSlice: StateCreator<
  StoreState,
  [],
  [],
  ClassificationSlice
> = (set) => ({
  // State
  classification: null,
  isClassifying: false,
  error: null,
  history: [],

  // Actions
  startClassification: () =>
    set({
      isClassifying: true,
      error: null
    }),

  setClassification: (classification: Classification) =>
    set((state) => ({
      classification,
      isClassifying: false,
      error: null,
      history: [classification, ...state.history].slice(0, 10) // Keep last 10
    })),

  setClassificationError: (error: Error) =>
    set({
      error,
      isClassifying: false
    }),

  resetClassification: () =>
    set({
      classification: null,
      isClassifying: false,
      error: null
    })
});
