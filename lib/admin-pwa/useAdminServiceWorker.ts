"use client";

import { useEffect, useState } from "react";

/**
 * Mendaftarkan service worker admin dengan scope yang DIKUNCI
 * secara eksplisit ke "/purchase-requests".
 *
 * Ini adalah satu-satunya tempat di seluruh codebase yang
 * memanggil navigator.serviceWorker.register(). Hook ini hanya
 * dipakai oleh AdminPwaProvider, yang hanya di-mount lewat
 * app/(admin)/layout.tsx — sehingga service worker ini TIDAK
 * PERNAH terdaftar ketika user membuka halaman publik atau /login.
 *
 * Parameter `enabled` adalah lapis pertahanan KEDUA (defense in depth):
 * AdminPwaProvider mengecek usePathname().startsWith("/purchase-requests")
 * sebelum mengizinkan hook ini benar-benar mendaftarkan service worker.
 * Kalau `enabled` false, hook ini tidak melakukan apa pun.
 */
export function useAdminServiceWorker(enabled: boolean) {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (
      !enabled ||
      typeof window === "undefined" ||
      !("serviceWorker" in navigator)
    ) {
      return;
    }

    let isCancelled = false;

    navigator.serviceWorker
      .register("/admin-sw.js", {
        scope: "/purchase-requests",
      })
      .then((reg) => {
        if (isCancelled) return;
        setRegistration(reg);

        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // Ada versi baru terpasang di background,
              // tapi jangan langsung reload — tunggu user klik "Perbarui".
              setUpdateAvailable(true);
            }
          });
        });
      })
      .catch((error) => {
        console.error(
          "Gagal mendaftarkan admin service worker:",
          error
        );
      });

    return () => {
      isCancelled = true;
    };
  }, [enabled]);

  const applyUpdate = () => {
    if (!registration?.waiting) {
      // Tidak ada worker yang menunggu — cukup reload biasa.
      window.location.reload();
      return;
    }

    registration.waiting.postMessage({ type: "SKIP_WAITING" });

    // Reload sekali setelah controller berganti, hindari infinite loop
    // dengan flag one-time listener.
    const handleControllerChange = () => {
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        handleControllerChange
      );
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      handleControllerChange
    );
  };

  return { updateAvailable, applyUpdate };
}
