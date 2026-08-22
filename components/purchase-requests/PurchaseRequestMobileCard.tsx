"use client";

import Link from "next/link";
import { useState } from "react";

type PurchaseRequest = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  organization: string | null;
  status: string | null;
  estimated_total: number | null;
  created_at: string;
};

const statusConfig: Record<
  string,
  {
    label: string;
    className: string;
  }
> = {
  approved: {
    label: "Disetujui",
    className:
      "border-gray-200 bg-gray-100 text-gray-800",
  },

  verified: {
    label: "Terverifikasi",
    className:
      "border-blue-200 bg-blue-100 text-blue-800",
  },

  quotation_sent: {
    label: "Penawaran Dikirim",
    className:
      "border-purple-200 bg-purple-100 text-purple-800",
  },

  negotiation: {
    label: "Negosiasi",
    className:
      "border-amber-200 bg-amber-100 text-amber-800",
  },

  rejected: {
    label: "Ditolak",
    className:
      "border-red-200 bg-red-100 text-red-800",
  },

  completed: {
    label: "Selesai",
    className:
      "border-emerald-200 bg-emerald-100 text-emerald-800",
  },
};

function formatCurrency(value: number | null) {
  if (value === null) {
    return "Belum ditentukan";
  }

  return `Rp ${Number(value).toLocaleString("id-ID")}`;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(
    "id-ID",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );
}

function formatRequestId(id: string) {
  return `${id.slice(0, 8)}…${id.slice(-6)}`;
}

export default function PurchaseRequestMobileCard({
  request,
}: {
  request: PurchaseRequest;
}) {
  const [copied, setCopied] =
    useState(false);

  const normalizedStatus =
    request.status?.toLowerCase() ??
    "pending";

  const status =
    statusConfig[normalizedStatus] ?? {
      label: normalizedStatus,
      className:
        "border-stone-200 bg-stone-100 text-stone-700",
    };

  const copyRequestId = async () => {
    try {
      await navigator.clipboard.writeText(
        request.id
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      console.error(
        "Gagal menyalin ID permintaan."
      );
    }
  };

  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-stone-900">
            {request.full_name ||
              "Tanpa nama"}
          </h2>

          <p className="mt-1 truncate text-sm text-stone-500">
            {request.email || "-"}
          </p>

          <div className="mt-2 flex min-w-0 items-center gap-2">
            <code
              title={request.id}
              className="min-w-0 truncate text-xs text-stone-400"
            >
              ID:{" "}
              {formatRequestId(
                request.id
              )}
            </code>

            <button
              type="button"
              onClick={copyRequestId}
              className="shrink-0 rounded-md border border-stone-200 px-2 py-1 text-xs font-medium text-stone-600 transition hover:bg-stone-100 active:bg-stone-200"
              title="Salin ID permintaan"
            >
              {copied
                ? "Tersalin"
                : "📋"}
            </button>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
            Total
          </p>

          <p className="mt-1 text-sm font-semibold text-stone-900">
            {formatCurrency(
              request.estimated_total
            )}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
            Tanggal
          </p>

          <p className="mt-1 text-sm font-medium text-stone-700">
            {formatDate(
              request.created_at
            )}
          </p>
        </div>
      </div>

      {(request.phone ||
        request.organization) && (
        <div className="mt-4 border-t border-stone-100 pt-4">
          <div className="space-y-2 text-sm">
            {request.phone && (
              <div className="flex justify-between gap-4">
                <span className="text-stone-500">
                  Kontak
                </span>

                <span className="text-right font-medium text-stone-700">
                  {request.phone}
                </span>
              </div>
            )}

            {request.organization && (
              <div className="flex justify-between gap-4">
                <span className="text-stone-500">
                  Instansi
                </span>

                <span className="text-right font-medium text-stone-700">
                  {request.organization}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-5">
        <Link
          href={`/purchase-requests/${request.id}`}
          className="flex min-h-11 w-full items-center justify-center rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 active:scale-[0.99]"
        >
          Lihat Detail
        </Link>
      </div>
    </article>
  );
}