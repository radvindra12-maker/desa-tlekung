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

const DISMISS_KEY =
  "giri-murti-admin-install-dismissed";

function detectStandalone(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.matchMedia(
      "(display-mode: standalone)"
    ).matches ||
    // iOS Safari
    Boolean(
      (
        window.navigator as Navigator & {
          standalone?: boolean;
        }
      ).standalone
    )
  );
}

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(
      null
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
    useState<boolean>(() =>
      detectStandalone()
    );

  useEffect(() => {
    const handleBeforeInstallPrompt = (
      event: Event
    ) => {
      event.preventDefault();

      setDeferredPrompt(
        event as BeforeInstallPromptEvent
      );
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);

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
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    window.addEventListener(
      "appinstalled",
      handleAppInstalled
    );

    mediaQuery.addEventListener(
      "change",
      handleDisplayModeChange
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
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
      if (!deferredPrompt) {
        return;
      }

      try {
        await deferredPrompt.prompt();
        await deferredPrompt.userChoice;
      } finally {
        setDeferredPrompt(null);
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