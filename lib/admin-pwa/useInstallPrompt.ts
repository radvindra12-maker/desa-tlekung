"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

interface BeforeInstallPromptEvent
  extends Event {
  prompt: () => Promise<void>;

  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

declare global {
  interface Window {
    __giriMurtiInstallPrompt?: BeforeInstallPromptEvent;
  }
}

const DISMISS_KEY =
  "giri-murti-admin-install-dismissed";

/**
 * Tangkap event sedini mungkin saat module client
 * sudah dimuat.
 *
 * Ini mencegah beforeinstallprompt terlewat
 * sebelum useEffect component berjalan.
 */
if (
  typeof window !== "undefined" &&
  !window.__giriMurtiInstallPrompt
) {
  window.addEventListener(
    "beforeinstallprompt",
    (event) => {
      event.preventDefault();

      const installEvent =
        event as BeforeInstallPromptEvent;

      window.__giriMurtiInstallPrompt =
        installEvent;

      window.dispatchEvent(
        new CustomEvent(
          "giri-murti-install-available"
        )
      );
    }
  );
}

function detectStandalone(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const standalone =
    window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

  const iosStandalone = Boolean(
    (
      window.navigator as Navigator & {
        standalone?: boolean;
      }
    ).standalone
  );

  return standalone || iosStandalone;
}

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(
      () =>
        typeof window !== "undefined"
          ? window.__giriMurtiInstallPrompt ??
            null
          : null
    );

  const [isDismissed, setIsDismissed] =
    useState<boolean>(() => {
      if (typeof window === "undefined") {
        return false;
      }

      try {
        return (
          window.localStorage.getItem(
            DISMISS_KEY
          ) === "1"
        );
      } catch {
        return false;
      }
    });

  const [isInstalled, setIsInstalled] =
    useState(() => detectStandalone());

  useEffect(() => {
    const syncInstallPrompt = () => {
      setDeferredPrompt(
        window.__giriMurtiInstallPrompt ??
          null
      );
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);

      delete window.__giriMurtiInstallPrompt;

      try {
        window.localStorage.removeItem(
          DISMISS_KEY
        );
      } catch {
        // Abaikan jika localStorage tidak tersedia.
      }
    };

    const handleDisplayModeChange = () => {
      setIsInstalled(
        detectStandalone()
      );
    };

    const mediaQuery = window.matchMedia(
      "(display-mode: standalone)"
    );

    window.addEventListener(
      "giri-murti-install-available",
      syncInstallPrompt
    );

    window.addEventListener(
      "appinstalled",
      handleAppInstalled
    );

    mediaQuery.addEventListener(
      "change",
      handleDisplayModeChange
    );

    // Sync sekali lagi setelah mount.
    syncInstallPrompt();

    return () => {
      window.removeEventListener(
        "giri-murti-install-available",
        syncInstallPrompt
      );

      window.removeEventListener(
        "appinstalled",
        handleAppInstalled
      );

      mediaQuery.removeEventListener(
        "change",
        handleDisplayModeChange
      );
    };
  }, []);

  const promptInstall = useCallback(
    async () => {
      const prompt =
        deferredPrompt ??
        window.__giriMurtiInstallPrompt;

      if (!prompt) {
        console.warn(
          "beforeinstallprompt belum tersedia."
        );

        return;
      }

      try {
        await prompt.prompt();

        const choice =
          await prompt.userChoice;

        console.log(
          "Install choice:",
          choice.outcome
        );
      } catch (error) {
        console.error(
          "Gagal menampilkan install prompt:",
          error
        );
      } finally {
        setDeferredPrompt(null);
        delete window.__giriMurtiInstallPrompt;
      }
    },
    [deferredPrompt]
  );

  const dismiss = useCallback(() => {
    setIsDismissed(true);

    try {
      window.localStorage.setItem(
        DISMISS_KEY,
        "1"
      );
    } catch {
      // Abaikan jika localStorage tidak tersedia.
    }
  }, []);

  const canInstall =
    !!deferredPrompt &&
    !isDismissed &&
    !isInstalled;

  return {
    canInstall,
    promptInstall,
    dismiss,
  };
}