"use client";

import { useEffect, useState, useCallback } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

const DISMISS_KEY = "giri-murti-admin-install-dismissed";

/**
 * Menangkap event `beforeinstallprompt` milik browser dan
 * menyimpannya agar bisa dipicu manual lewat tombol "Pasang".
 *
 * Tidak pernah memanggil browser install prompt secara paksa —
 * hanya menyimpan event, lalu menunggu interaksi user.
 */
export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return (
        window.localStorage.getItem(DISMISS_KEY) === "1"
      );
    } catch {
      return false;
    }
  });

  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener(
        "appinstalled",
        handleAppInstalled
      );
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const dismiss = useCallback(() => {
    setIsDismissed(true);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // localStorage bisa gagal (mode privat, dsb) — abaikan.
    }
  }, []);

  const canInstall =
    !!deferredPrompt && !isDismissed && !isInstalled;

  return { canInstall, promptInstall, dismiss };
}
