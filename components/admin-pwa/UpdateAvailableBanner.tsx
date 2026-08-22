"use client";

import { RefreshCw } from "lucide-react";

interface UpdateAvailableBannerProps {
  onUpdate: () => void;
}

export function UpdateAvailableBanner({
  onUpdate,
}: UpdateAvailableBannerProps) {
  return (
    <div
      role="status"
      className="fixed inset-x-4 top-4 z-50 mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-2xl shadow-black/10 sm:right-4 sm:left-auto"
    >
      <div className="flex items-center gap-2">
        <RefreshCw
          className="h-4 w-4"
          style={{ color: "var(--green)" }}
        />
        <p className="text-sm font-medium text-stone-800">
          Versi baru tersedia
        </p>
      </div>

      <button
        type="button"
        onClick={onUpdate}
        className="shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium text-white transition hover:opacity-90"
        style={{
          background:
            "linear-gradient(135deg, var(--dark-green), var(--green))",
        }}
      >
        Perbarui
      </button>
    </div>
  );
}
