"use client";

import { useEffect, useState } from "react";

const VAPID_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "";

function urlBase64ToUint8Array(
  base64String: string
) {
  const padding =
    "=".repeat(
      (4 - (base64String.length % 4)) % 4
    );

  const base64 =
    (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

  const rawData = window.atob(base64);

  return Uint8Array.from(
    [...rawData].map((character) =>
      character.charCodeAt(0)
    )
  );
}

function isIOSDevice() {
  const userAgent = navigator.userAgent;

  return (
    /iPad|iPhone|iPod/.test(userAgent) ||
    (navigator.platform === "MacIntel" &&
      navigator.maxTouchPoints > 1)
  );
}

function isStandalone() {
  const standaloneMedia = window.matchMedia(
    "(display-mode: standalone)"
  ).matches;

  const appleStandalone =
    (
      navigator as Navigator & {
        standalone?: boolean;
      }
    ).standalone === true;

  return standaloneMedia || appleStandalone;
}

export function PushNotificationButton() {
  const [enabled, setEnabled] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState<string | null>(null);

  useEffect(() => {
    async function checkSubscription() {
      if (
        !("serviceWorker" in navigator) ||
        !("PushManager" in window)
      ) {
        return;
      }

      try {
        const registration =
          await navigator.serviceWorker.ready;

        const subscription =
          await registration.pushManager.getSubscription();

        if (
          subscription &&
          Notification.permission === "granted"
        ) {
          setEnabled(true);
        }
      } catch (error) {
        console.error(
          "Gagal memeriksa push subscription:",
          error
        );
      }
    }

    checkSubscription();
  }, []);

  async function enableNotifications() {
    if (loading) {
      return;
    }

    setMessage(null);

    if (!VAPID_PUBLIC_KEY) {
      setMessage(
        "Konfigurasi notifikasi belum tersedia."
      );
      return;
    }

    if (
      !window.isSecureContext ||
      !("serviceWorker" in navigator) ||
      !("PushManager" in window) ||
      !("Notification" in window)
    ) {
      setMessage(
        "Browser ini belum mendukung notifikasi push."
      );
      return;
    }

    if (
      isIOSDevice() &&
      !isStandalone()
    ) {
      setMessage(
        "Di iPhone, tambahkan Giri Murti Admin ke Home Screen lalu buka aplikasi tersebut untuk mengaktifkan notifikasi."
      );
      return;
    }

    setLoading(true);

    try {
      const permission =
        await Notification.requestPermission();

      if (permission !== "granted") {
        if (permission === "denied") {
          setMessage(
            "Notifikasi diblokir oleh browser. Aktifkan kembali izin notifikasi dari pengaturan browser/perangkat."
          );
        } else {
          setMessage(
            "Izin notifikasi belum diberikan."
          );
        }

        return;
      }

      const registration =
        await navigator.serviceWorker.ready;

      let subscription =
        await registration.pushManager.getSubscription();

      if (!subscription) {
        subscription =
          await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey:
              urlBase64ToUint8Array(
                VAPID_PUBLIC_KEY
              ),
          });
      }

      const response = await fetch(
        "/api/admin/push/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            subscription.toJSON()
          ),
        }
      );

      const result =
        (await response.json()) as {
          error?: string;
        };

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Gagal menyimpan subscription."
        );
      }

      setEnabled(true);
      setMessage(
        "Notifikasi berhasil diaktifkan."
      );
    } catch (error) {
      console.error(
        "Gagal mengaktifkan notifikasi:",
        error
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "Gagal mengaktifkan notifikasi."
      );
    } finally {
      setLoading(false);
    }
  }

  if (enabled) {
    return (
      <div className="fixed bottom-4 left-4 z-40 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-xs font-medium text-emerald-700 shadow-lg">
        🔔 Notifikasi aktif
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-[calc(100vw-2rem)] rounded-2xl border border-stone-200 bg-white p-4 shadow-lg">
      <div className="flex items-start gap-3">
        <div className="shrink-0 text-xl">
          🔔
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-stone-900">
            Notifikasi Permintaan
          </p>

          <p className="mt-1 text-xs leading-5 text-stone-500">
            Dapatkan pemberitahuan saat ada
            permintaan pembelian baru.
          </p>

          <button
            type="button"
            onClick={enableNotifications}
            disabled={loading}
            className="mt-3 min-h-11 rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Mengaktifkan..."
              : "Aktifkan Notifikasi"}
          </button>

          {message && (
            <p className="mt-2 text-xs leading-5 text-stone-500">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}