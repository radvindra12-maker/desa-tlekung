"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { useAdminServiceWorker } from "@/lib/admin-pwa/useAdminServiceWorker";
import { InstallPrompt } from "@/components/admin-pwa/InstallPrompt";
import { OfflineIndicator } from "@/components/admin-pwa/OfflineIndicator";
import { UpdateAvailableBanner } from "@/components/admin-pwa/UpdateAvailableBanner";
import { PushNotificationButton } from "@/components/admin-pwa/PushNotificationButton";

const ADMIN_PWA_PATH_PREFIX =
  "/purchase-requests";

export function AdminPwaProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const isAdminPwaActive =
    pathname?.startsWith(
      ADMIN_PWA_PATH_PREFIX
    ) ?? false;

  const {
    updateAvailable,
    applyUpdate,
  } = useAdminServiceWorker(
    isAdminPwaActive
  );

  return (
    <>
      {isAdminPwaActive && (
        <OfflineIndicator />
      )}

      {children}

      {isAdminPwaActive && (
        <>
          <PushNotificationButton />

          <InstallPrompt />

          {updateAvailable && (
            <UpdateAvailableBanner
              onUpdate={applyUpdate}
            />
          )}
        </>
      )}
    </>
  );
}