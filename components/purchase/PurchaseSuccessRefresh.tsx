"use client";

import { useEffect, useState } from "react";

type Props = {
  requestId: string;
};

export default function PurchaseSuccessRefresh({
  requestId,
}: Props) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [requestId]);

  const handleRefresh = () => {
    if (loading) return;

    setLoading(true);
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleRefresh}
        disabled={loading}
        className="
          inline-flex
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-stone-300
          bg-white
          px-5
          py-2.5
          text-sm
          font-semibold
          text-stone-700
          transition
          hover:border-stone-400
          hover:bg-stone-50
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        <span className={loading ? "animate-spin" : ""}>
          ↻
        </span>

        {loading ? "Memperbarui..." : "Perbarui Status"}
      </button>

      <p className="text-xs text-stone-400">
        Status diperbarui otomatis setiap 10 detik
      </p>
    </div>
  );
}