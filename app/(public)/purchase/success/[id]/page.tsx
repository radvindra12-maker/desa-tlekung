import Link from "next/link";
import { notFound } from "next/navigation";

import { supabaseServer } from "@/lib/supabase/server";
import type { PurchaseStatus } from "@/types/purchase";
import PurchaseStatusLive from "@/components/purchase/PurchaseStatusLive";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PurchaseSuccessPage({
  params,
}: PageProps) {
  const { id } = await params;

  const supabase = await supabaseServer;

  const { data: request, error } = await supabase
    .from("purchase_requests")
    .select(
      "id, full_name, status, estimated_total, admin_note, created_at"
    )
    .eq("id", id)
    .single();

  if (error || !request) {
    console.error(
      "Gagal mengambil purchase request:",
      error
    );

    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-16">

      <div className="mx-auto max-w-2xl">

        <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm md:p-12">

          {/* SUCCESS ICON */}

          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">

              <span className="text-3xl text-emerald-600">
                ✓
              </span>

            </div>

            <h1 className="mt-6 text-3xl font-bold text-stone-900">
              Permintaan Berhasil Dikirim
            </h1>

            <p className="mx-auto mt-4 max-w-lg leading-7 text-stone-600">
              Terima kasih,{" "}
              <span className="font-semibold">
                {request.full_name}
              </span>
              . Permintaan pembelian Anda telah berhasil
              dikirim kepada tim Kopi Girimurti.
            </p>

          </div>

          {/* REQUEST INFO */}

          <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-5">

            <div className="flex items-center justify-between gap-4">

              <span className="text-sm text-stone-500">
                ID Permintaan
              </span>

              <span className="max-w-[280px] break-all text-right text-sm font-medium text-stone-900">
                {request.id}
              </span>

            </div>

            <div className="mt-4 flex items-center justify-between gap-4">

              <span className="text-sm text-stone-500">
                Tanggal
              </span>

              <span className="text-sm font-medium text-stone-900">
                {new Date(
                  request.created_at
                ).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>

            </div>

          </div>

          {/* LIVE STATUS */}

          <div className="mt-8">

            <PurchaseStatusLive
              requestId={request.id}
              initialStatus={request.status as PurchaseStatus}
              initialTotal={request.estimated_total}
              initialNote={request.admin_note}
            />

          </div>

          {/* IMPORTANT INFO */}

          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">

            <h2 className="font-semibold text-amber-900">
              Anda tidak perlu menunggu di halaman ini
            </h2>

            <p className="mt-2 text-sm leading-6 text-amber-800">
              Permintaan Anda sudah tercatat. Tim kami akan
              melakukan konfirmasi mengenai ketersediaan
              produk, harga, dan pengiriman.
            </p>

            <p className="mt-2 text-sm leading-6 text-amber-800">
              Anda dapat meninggalkan halaman ini dan kembali
              menggunakan halaman ini untuk memeriksa status
              permintaan Anda.
            </p>

          </div>

          {/* NAVIGATION */}

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500"
            >
              Kembali ke Beranda
            </Link>

            <Link
              href="/purchase"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 px-6 py-3 font-semibold text-stone-700 transition hover:bg-stone-50"
            >
              Buat Permintaan Lagi
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}