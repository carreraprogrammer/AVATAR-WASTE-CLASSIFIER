/**
 * LocalStorage Service
 * Utility functions for persistent storage
 */

/**
 * Get item from localStorage with type safety
 * @param key Storage key
 * @param defaultValue Default value if key doesn't exist
 * @returns Parsed value or default
 */
export function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`[LocalStorage] Failed to get item "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Set item in localStorage
 * @param key Storage key
 * @param value Value to store
 */
export function setItem<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`[LocalStorage] Failed to set item "${key}":`, error);
  }
}

/**
 * Remove item from localStorage
 * @param key Storage key
 */
export function removeItem(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`[LocalStorage] Failed to remove item "${key}":`, error);
  }
}

/**
 * Clear all items from localStorage
 */
export function clear(): void {
  try {
    window.localStorage.clear();
  } catch (error) {
    console.error('[LocalStorage] Failed to clear storage:', error);
  }
}

/**
 * Check if key exists in localStorage
 * @param key Storage key
 * @returns True if key exists
 */
export function hasItem(key: string): boolean {
  return window.localStorage.getItem(key) !== null;
}

/**
 * Get all keys from localStorage
 * @returns Array of storage keys
 */
export function getAllKeys(): string[] {
  const keys: string[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (key !== null) {
      keys.push(key);
    }
  }
  return keys;
}

/**
 * Get localStorage size in bytes
 * @returns Approximate size in bytes
 */
export function getStorageSize(): number {
  let size = 0;
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (key !== null) {
      const value = window.localStorage.getItem(key);
      if (value !== null) {
        size += key.length + value.length;
      }
    }
  }
  return size;
}

// Storage keys constants
export const STORAGE_KEYS = {
  CONFIG: 'eco-assistant-config',
  HISTORY: 'eco-assistant-history',
  AUTH_TOKEN: 'auth_token'
} as const;
