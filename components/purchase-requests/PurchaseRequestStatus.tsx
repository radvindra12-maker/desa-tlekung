"use client";

import { useState } from "react";

const statuses = [
  {
    value: "approved",
    label: "Disetujui",
  },
  {
    value: "verified",
    label: "Terverifikasi",
  },
  {
    value: "quotation_sent",
    label: "Penawaran Dikirim",
  },
  {
    value: "negotiation",
    label: "Negosiasi",
  },
  {
    value: "rejected",
    label: "Ditolak",
  },
  {
    value: "completed",
    label: "Selesai",
  },
] as const;

type Status = (typeof statuses)[number]["value"];

type Props = {
  requestId: string;
  currentStatus: string;
};

export default function PurchaseRequestStatus({
  requestId,
  currentStatus,
}: Props) {
  const initialStatus: Status = statuses.some(
  (item) => item.value === currentStatus
)
  ? (currentStatus as Status)
  : "verified";

  const [status, setStatus] =
    useState<Status>(initialStatus);

  const [saving, setSaving] = useState(false);

  async function handleChange(nextStatus: Status) {
    const previousStatus = status;

    setStatus(nextStatus);
    setSaving(true);

    try {
      const response = await fetch(
        `/api/purchase-requests/${requestId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: nextStatus,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error || "Gagal memperbarui status."
        );
      }
    } catch (error) {
      console.error(
        "Gagal memperbarui status:",
        error
      );

      setStatus(previousStatus);

      alert(
        error instanceof Error
          ? error.message
          : "Gagal memperbarui status."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <select
        value={status}
        disabled={saving}
        onChange={(event) =>
          handleChange(
            event.target.value as Status
          )
        }
        className="rounded-lg border px-3 py-2 text-sm"
      >
        {statuses.map((item) => (
          <option
            key={item.value}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>

      {saving && (
        <span className="text-sm text-gray-500">
          Menyimpan...
        </span>
      )}
    </div>
  );
}