"use client";

import { WifiOff } from "lucide-react";
import { useOnlineStatus } from "@/lib/admin-pwa/useOnlineStatus";

export function OfflineIndicator() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="sticky top-0 z-40 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white"
      style={{ backgroundColor: "var(--coffee)" }}
    >
      <WifiOff className="h-4 w-4" />
      <span>
        Anda sedang offline — data yang tampil mungkin tidak
        terbaru.
      </span>
    </div>
  );
}
