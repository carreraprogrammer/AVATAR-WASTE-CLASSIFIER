/**
 * Camera Slice
 * State management for camera stream and detection
 */

import type { StateCreator } from 'zustand';
import type { StoreState, CameraSlice } from '@/types/store.types';

export const cameraSlice: StateCreator<
  StoreState,
  [],
  [],
  CameraSlice
> = (set) => ({
  // State
  stream: null,
  isActive: false,
  isCameraReady: false,
  cameraError: null,
  lastDetection: null,

  // Actions
  setStream: (stream: MediaStream | null) =>
    set({ stream }),

  setIsActive: (isActive: boolean) =>
    set({ isActive }),

  setCameraReady: (isCameraReady: boolean) =>
    set({ isCameraReady }),

  setCameraError: (cameraError: Error | null) =>
    set({ cameraError }),

  setLastDetection: (lastDetection: Date) =>
    set({ lastDetection })
});
