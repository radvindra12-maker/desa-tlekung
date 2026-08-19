import Link from "next/link";

type PageProps = {
  searchParams: Promise<{
    id?: string;
  }>;
};

export default async function PurchaseSuccessPage({
  searchParams,
}: PageProps) {
  const { id } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <span className="text-3xl text-emerald-600">
            ✓
          </span>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-stone-900">
          Permintaan Berhasil Dikirim
        </h1>

        <p className="mt-3 leading-7 text-stone-600">
          Terima kasih. Permintaan pembelian kamu
          berhasil dikirim dan akan segera diproses
          oleh tim kami.
        </p>

        {id && (
          <div className="mt-6 rounded-xl bg-stone-50 p-4">
            <p className="text-sm text-stone-500">
              ID Permintaan
            </p>

            <p className="mt-1 break-all font-mono text-sm font-medium text-stone-900">
              {id}
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500"
          >
            Kembali ke Beranda
          </Link>

          <Link
            href="/purchase"
            className="rounded-full border border-stone-300 px-6 py-3 font-semibold text-stone-700 transition hover:bg-stone-50"
          >
            Kembali ke Produk
          </Link>
        </div>

      </div>
    </main>
  );
}