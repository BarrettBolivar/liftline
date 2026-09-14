"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

const KEY = "liftline:pro";
const EVENT = "liftline-pro";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(EVENT, onStoreChange);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(KEY) === "1";
}

function getServerSnapshot() {
  return false;
}

type ProContextValue = {
  isPro: boolean;
  unlock: () => void;
  lock: () => void;
};

const ProContext = createContext<ProContextValue | null>(null);

export function ProProvider({ children }: { children: React.ReactNode }) {
  const isPro = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const unlock = useCallback(() => {
    localStorage.setItem(KEY, "1");
    window.dispatchEvent(new Event(EVENT));
  }, []);
  const lock = useCallback(() => {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new Event(EVENT));
  }, []);
  const value = useMemo(() => ({ isPro, unlock, lock }), [isPro, unlock, lock]);
  return <ProContext.Provider value={value}>{children}</ProContext.Provider>;
}

export function usePro() {
  const ctx = useContext(ProContext);
  if (!ctx) throw new Error("usePro must be used under ProProvider");
  return ctx;
}
