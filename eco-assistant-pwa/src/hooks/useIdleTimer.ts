/**
 * useIdleTimer Hook
 * Auto-reset after inactivity timeout
 */

import { useEffect, useRef, useCallback } from 'react';

interface UseIdleTimerOptions {
  timeout: number; // milliseconds
  onTimeout: () => void;
  enabled?: boolean;
}

export const useIdleTimer = ({
  timeout,
  onTimeout,
  enabled = true
}: UseIdleTimerOptions) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Reset the idle timer
   */
  const resetTimer = useCallback(() => {
    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Only set new timer if enabled
    if (!enabled) {
      return;
    }

    // Set new timer
    timerRef.current = setTimeout(() => {
      console.log('[useIdleTimer] Timeout reached, triggering callback');
      onTimeout();
    }, timeout);
  }, [timeout, onTimeout, enabled]);

  /**
   * Stop the idle timer
   */
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Start timer on mount and when dependencies change
  useEffect(() => {
    if (enabled) {
      resetTimer();
    }

    return () => {
      stopTimer();
    };
  }, [enabled, resetTimer, stopTimer]);

  return {
    resetTimer,
    stopTimer
  };
};
