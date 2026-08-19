"use client";

import { useCallback, useEffect, useState } from "react";
import type { PurchaseStatus } from "@/types/purchase";



type PurchaseStatusLiveProps = {
  requestId: string;
  initialStatus: PurchaseStatus;
  initialTotal: number | null;
  initialNote: string | null;
};

const statusConfig: Record<
  PurchaseStatus,
  {
    label: string;
    description: string;
    className: string;
  }
> = {
  pending: {
    label: "Menunggu Konfirmasi",
    description:
      "Permintaan Anda telah diterima dan sedang menunggu pemeriksaan dari admin.",
    className:
      "bg-amber-100 text-amber-800 border-amber-200",
  },

  verified: {
    label: "Terverifikasi",
    description:
      "Permintaan Anda telah diperiksa dan diverifikasi oleh admin.",
    className:
      "bg-blue-100 text-blue-800 border-blue-200",
  },

  contacted: {
    label: "Sudah Dihubungi",
    description:
      "Admin telah menghubungi Anda untuk membahas permintaan pembelian.",
    className:
      "bg-indigo-100 text-indigo-800 border-indigo-200",
  },

  negotiation: {
    label: "Negosiasi",
    description:
      "Permintaan Anda sedang dalam tahap pembahasan harga dan detail pembelian.",
    className:
      "bg-violet-100 text-violet-800 border-violet-200",
  },

  quotation_sent: {
    label: "Penawaran Dikirim",
    description:
      "Admin telah mengirimkan penawaran harga untuk permintaan Anda.",
    className:
      "bg-cyan-100 text-cyan-800 border-cyan-200",
  },

  approved: {
    label: "Disetujui",
    description:
      "Penawaran telah disetujui dan pesanan siap diproses.",
    className:
      "bg-emerald-100 text-emerald-800 border-emerald-200",
  },

  completed: {
    label: "Selesai",
    description:
      "Permintaan pembelian Anda telah selesai diproses.",
    className:
      "bg-emerald-100 text-emerald-800 border-emerald-200",
  },

  rejected: {
    label: "Ditolak",
    description:
      "Permintaan pembelian ini tidak dapat diproses.",
    className:
      "bg-red-100 text-red-800 border-red-200",
  },
};

export default function PurchaseStatusLive({
  requestId,
  initialStatus,
  initialTotal,
  initialNote,
}: PurchaseStatusLiveProps) {
  const [status, setStatus] =
    useState<PurchaseStatus>(initialStatus);

  const [total, setTotal] =
    useState<number | null>(initialTotal);

  const [note, setNote] =
    useState<string | null>(initialNote);

  const [loading, setLoading] = useState(false);

  const [lastChecked, setLastChecked] =
    useState<Date | null>(null);

  const checkStatus = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `/api/purchase-requests/${requestId}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Gagal mengambil status permintaan."
        );
      }

      const data = await response.json();

      setStatus(data.status);
      setTotal(data.estimated_total ?? null);
      setNote(data.admin_note ?? null);
      setLastChecked(new Date());
    } catch (error) {
      console.error(
        "Gagal memperbarui status:",
        error
      );
    } finally {
      setLoading(false);
    }
  }, [requestId]);

  useEffect(() => {
    const interval = setInterval(() => {
      checkStatus();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [checkStatus]);

  const config = statusConfig[status];

  const formattedTotal =
    total !== null
      ? new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(total)
      : null;

  return (
    <div className="space-y-6">

      {/* STATUS */}
      <div className="rounded-2xl bg-stone-50 p-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm text-stone-500">
              Status Permintaan
            </p>

            <h2 className="mt-1 text-xl font-semibold text-stone-900">
              {config.label}
            </h2>
          </div>

          <span
  className={`inline-flex w-fit rounded-full border px-4 py-2 text-sm font-semibold ${config.className}`}
>
  {config.label}
</span>

        </div>

        <p className="mt-4 text-sm leading-6 text-stone-600">
          {config.description}
        </p>

      </div>

      {/* TOTAL */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6">

        <p className="text-sm text-stone-500">
          Total Permintaan
        </p>

        {formattedTotal ? (
          <p className="mt-2 text-3xl font-bold text-stone-900">
            {formattedTotal}
          </p>
        ) : (
          <p className="mt-2 text-lg font-semibold text-amber-700">
            Menunggu konfirmasi harga
          </p>
        )}

      </div>

      {/* CATATAN ADMIN */}
      {note && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">

          <p className="text-sm font-semibold text-emerald-900">
            Catatan dari Admin
          </p>

          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-emerald-800">
            {note}
          </p>

        </div>
      )}

      {/* ACTION */}
      <div className="flex flex-col gap-3 sm:flex-row">

        <button
          type="button"
          onClick={checkStatus}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span
            className={
              loading ? "animate-spin" : ""
            }
          >
            ↻
          </span>

          {loading
            ? "Memeriksa..."
            : "Cek Status Sekarang"}
        </button>

        <a
          href={`https://wa.me/6281234292878?text=${encodeURIComponent(
            `Halo Admin Kopi Girimurti, saya ingin menanyakan permintaan pembelian dengan ID ${requestId}.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-600 px-6 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
        >
          💬 Hubungi Admin via WhatsApp
        </a>

      </div>

      {/* LAST CHECK */}
      <div className="text-center text-xs text-stone-400">

        {loading
          ? "Memperbarui status..."
          : lastChecked
            ? `Terakhir diperiksa ${lastChecked.toLocaleTimeString(
                "id-ID"
              )}`
            : "Status diperiksa otomatis setiap 10 detik."}

      </div>

    </div>
  );
}