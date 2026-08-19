"use client";

import { useState } from "react";

type Props = {
  requestId: string;
  currentTotal: number | null;
};

function formatRupiah(value: number | null) {
  if (value === null) return "";

  return new Intl.NumberFormat("id-ID").format(value);
}

function parseRupiah(value: string) {
  const digits = value.replace(/\D/g, "");

  if (!digits) return "";

  return new Intl.NumberFormat("id-ID").format(
    Number(digits)
  );
}

export default function PurchaseRequestTotal({
  requestId,
  currentTotal,
}: Props) {
  const [total, setTotal] = useState(
    formatRupiah(currentTotal)
  );

  const [saving, setSaving] = useState(false);

  async function handleSave() {
    const digits = total.replace(/\D/g, "");
    const numericTotal = Number(digits);

    if (
      !digits ||
      Number.isNaN(numericTotal) ||
      numericTotal < 0
    ) {
      alert("Total harga tidak valid.");
      return;
    }

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
            estimated_total: numericTotal,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error ||
            "Gagal menyimpan total harga."
        );
      }

      setTotal(formatRupiah(numericTotal));

      alert("Total harga berhasil disimpan.");
    } catch (error) {
      console.error(
        "Gagal menyimpan total harga:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Gagal menyimpan total harga."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-3 sm:flex-row">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">
          Rp
        </span>

        <input
          type="text"
          inputMode="numeric"
          value={total}
          onChange={(event) => {
            setTotal(
              parseRupiah(event.target.value)
            );
          }}
          placeholder="Tentukan harga"
          disabled={saving}
          className="w-48 rounded-lg border px-3 py-2 text-right text-sm"
        />
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? "Menyimpan..." : "Simpan"}
      </button>
    </div>
  );
}