const STORAGE_PREFIX = "case-study:";

/**
 * Get a value from localStorage with prefix
 */
export const getStorageItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (item === null) return null;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return null;
  }
};

/**
 * Set a value in localStorage with prefix
 */
export const setStorageItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
  }
};

/**
 * Remove a value from localStorage with prefix
 */
export const removeStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error);
  }
};

/**
 * Clear all items with the prefix from localStorage
 */
export const clearStorage = (): void => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

/**
 * Get all keys with the prefix
 */
export const getStorageKeys = (): string[] => {
  try {
    const keys = Object.keys(localStorage);
    return keys
      .filter((key) => key.startsWith(STORAGE_PREFIX))
      .map((key) => key.replace(STORAGE_PREFIX, ""));
  } catch (error) {
    console.error("Error getting storage keys:", error);
    return [];
  }
};

