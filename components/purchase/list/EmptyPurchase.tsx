import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function EmptyPurchase() {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white px-8 py-16 text-center">
      <ShoppingBag className="mx-auto h-14 w-14 text-stone-300" />

      <h2 className="mt-6 text-2xl font-bold text-stone-900">
        Daftar Pembelian Masih Kosong
      </h2>

      <p className="mx-auto mt-3 max-w-md text-stone-600">
        Belum ada produk yang ditambahkan ke daftar pembelian.
        Silakan jelajahi produk terlebih dahulu.
      </p>

      <Link
        href="/produk"
        className="mt-8 inline-flex rounded-xl bg-amber-700 px-6 py-3 font-medium text-white transition hover:bg-amber-800"
      >
        Jelajahi Produk
      </Link>
    </div>
  );
}