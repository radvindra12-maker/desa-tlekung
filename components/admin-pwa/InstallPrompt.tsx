"use client";

import { Download, X } from "lucide-react";
import { useInstallPrompt } from "@/lib/admin-pwa/useInstallPrompt";

export function InstallPrompt() {
  const { canInstall, promptInstall, dismiss } = useInstallPrompt();

  if (!canInstall) return null;

  return (
    <div
      role="dialog"
      aria-label="Pasang aplikasi Giri Murti Admin"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-2xl border border-stone-200 bg-white p-4 shadow-2xl shadow-black/10 sm:right-4 sm:left-auto"
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white"
          style={{
            background:
              "linear-gradient(135deg, var(--dark-green), var(--green), var(--coffee))",
          }}
        >
          <Download className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-stone-900">
            Pasang Giri Murti Admin
          </p>
          <p className="mt-1 text-sm text-stone-600">
            Kelola permintaan pembelian lebih cepat dari
            perangkat Anda.
          </p>

          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={promptInstall}
              className="rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              style={{
                background:
                  "linear-gradient(135deg, var(--dark-green), var(--green))",
              }}
            >
              Pasang
            </button>

            <button
              type="button"
              onClick={dismiss}
              className="rounded-lg px-3 py-2 text-sm font-medium text-stone-500 transition hover:bg-stone-100"
            >
              Nanti saja
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Tutup"
          className="shrink-0 rounded-lg p-1 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
