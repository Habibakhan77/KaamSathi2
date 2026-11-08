"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DEFAULT_REGION, SelectedLocation, isSwatArea } from "./swat-areas";

const STORAGE_KEY = "kaamsaathi_location";

interface LocationContextType {
  /** "Swat" (whole district) or one of the 12 SWAT_AREAS. */
  location: SelectedLocation;
  setLocation: (loc: SelectedLocation) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  // Always start with "Swat" so server and first client render match.
  const [location, setLocationState] = useState<SelectedLocation>(DEFAULT_REGION);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isSwatArea(saved)) {
        setLocationState(saved);
      } else if (saved) {
        // Discard legacy values (e.g. "Lahore", "Fizagat") from the old city list.
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Storage unavailable — keep the default.
    }
  }, []);

  const setLocation = useCallback((loc: SelectedLocation) => {
    setLocationState(loc);
    try {
      if (loc === DEFAULT_REGION) localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, loc);
    } catch {
      // Ignore persistence failures.
    }
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
