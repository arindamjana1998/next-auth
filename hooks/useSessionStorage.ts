import { useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";

export function useSessionStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>, boolean] {
  // Initialize with default value to avoid hydration mismatch
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from session storage after mount
  useEffect(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
    }
    setIsInitialized(true);
  }, [key]);

  const setValue = useCallback(
    (value: SetStateAction<T>) => {
      try {
        // Allow value to be a function so we have same API as useState
        setStoredValue((prevStored) => {
          const valueToStore = value instanceof Function ? value(prevStored) : value;
          // Save to session storage
          if (typeof window !== "undefined") {
            window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
          }
           return valueToStore;
        });
      } catch (error) {
        console.warn(`Error setting sessionStorage key "${key}":`, error);
      }
    },
    [key]
  );

  return [storedValue, setValue, isInitialized];
}
