"use client";

import { useSyncExternalStore } from "react";

function subscribe(
  callback: () => void
) {
  window.addEventListener(
    "online",
    callback
  );

  window.addEventListener(
    "offline",
    callback
  );

  return () => {
    window.removeEventListener(
      "online",
      callback
    );

    window.removeEventListener(
      "offline",
      callback
    );
  };
}

function getSnapshot() {
  return navigator.onLine;
}

function getServerSnapshot() {
  return true;
}

/**
 * Melacak status online/offline browser
 * tanpa menyebabkan hydration mismatch.
 *
 * Server selalu memakai snapshot "true".
 * Setelah hydration selesai, React akan
 * mengambil snapshot browser yang sebenarnya.
 */
export function useOnlineStatus() {
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
}