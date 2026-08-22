"use client";

import { useEffect, useState } from "react";

/**
 * Melacak status online/offline browser.
 *
 * State awal diambil lewat lazy initializer (bukan di-set di
 * dalam useEffect), sehingga tidak memicu warning
 * "Calling setState synchronously within an effect".
 * Perubahan status hanya di-update lewat event listener
 * (online/offline), yang secara natural asinkron.
 */
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    if (typeof navigator === "undefined") return true;
    return navigator.onLine;
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}
