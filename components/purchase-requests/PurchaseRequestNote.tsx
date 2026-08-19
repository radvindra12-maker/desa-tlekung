"use client";

import { useState } from "react";

type Props = {
  requestId: string;
  currentNote: string | null;
};

export function PurchaseRequestNote({
  requestId,
  currentNote,
}: Props) {
  const [note, setNote] = useState(
    currentNote ?? ""
  );

  const [saving, setSaving] = useState(false);

  async function handleSave() {
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
            admin_note: note.trim() || null,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menyimpan catatan.");
      }

      alert("Catatan admin berhasil disimpan.");
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan catatan admin.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-3">
      <textarea
        value={note}
        onChange={(event) =>
          setNote(event.target.value)
        }
        rows={5}
        placeholder="Tulis catatan untuk permintaan ini..."
        disabled={saving}
        className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:border-stone-500"
      />

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Menyimpan..."
            : "Simpan Catatan"}
        </button>
      </div>
    </div>
  );
}