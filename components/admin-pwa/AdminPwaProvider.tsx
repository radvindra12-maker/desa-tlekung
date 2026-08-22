"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useAdminServiceWorker } from "@/lib/admin-pwa/useAdminServiceWorker";
import { InstallPrompt } from "@/components/admin-pwa/InstallPrompt";
import { OfflineIndicator } from "@/components/admin-pwa/OfflineIndicator";
import { UpdateAvailableBanner } from "@/components/admin-pwa/UpdateAvailableBanner";

const ADMIN_PWA_PATH_PREFIX = "/purchase-requests";

/**
 * Titik masuk TUNGGAL untuk seluruh perilaku PWA dashboard admin.
 *
 * Komponen ini HANYA di-mount lewat app/(admin)/layout.tsx, yang
 * hanya membungkus /purchase-requests dan /purchase-requests/[id].
 * Tidak pernah dipasang di root layout maupun (public)/(auth).
 *
 * Sebagai lapis pertahanan KEDUA (defense in depth) — bukan
 * pengganti isolasi arsitektural lewat route group — komponen ini
 * juga mengecek pathname secara eksplisit lewat usePathname().
 * Kalau pathname TIDAK diawali "/purchase-requests", service worker
 * tidak didaftarkan dan tidak ada UI PWA (install prompt, offline
 * indicator, update banner) yang dirender sama sekali.
 *
 * Setiap concern (SW registration, install prompt, offline
 * status, update detection) hidup di hook/komponennya sendiri —
 * provider ini cuma menggabungkan, bukan mengimplementasikan logic.
 */
export function AdminPwaProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPwaActive =
    pathname?.startsWith(ADMIN_PWA_PATH_PREFIX) ?? false;

  const { updateAvailable, applyUpdate } =
    useAdminServiceWorker(isAdminPwaActive);

  return (
    <>
      {isAdminPwaActive && <OfflineIndicator />}
      {children}
      {isAdminPwaActive && <InstallPrompt />}
      {isAdminPwaActive && updateAvailable && (
        <UpdateAvailableBanner onUpdate={applyUpdate} />
      )}
    </>
  );
}
