import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "selectedLocation";
const EVENT_KEY = "selectedLocationChanged";

export const useLocationFilter = (defaultLocation: string = "all") => {
  const [selectedLocation, setSelectedLocationState] =
    useState<string>(defaultLocation);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSelectedLocationState(saved);
      }
    } catch (error) {
      console.error("Failed to read location from localStorage", error);
    }
    setIsInitialized(true);
  }, []);

  // Update localStorage and dispatch event
  const setSelectedLocation = useCallback((value: string) => {
    setSelectedLocationState(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
      window.dispatchEvent(new Event(EVENT_KEY));
    } catch (error) {
      console.error("Failed to save location to localStorage", error);
    }
  }, []);

  // Listen for changes from other components/tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setSelectedLocationState(e.newValue);
      }
    };

    const handleCustomEvent = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSelectedLocationState(saved);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(EVENT_KEY, handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(EVENT_KEY, handleCustomEvent);
    };
  }, []);

  return {
    selectedLocation,
    setSelectedLocation,
    isInitialized,
  };
};
