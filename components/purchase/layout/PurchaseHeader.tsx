"use client";

export default function PurchaseHeader() {
  return (
    <div className="mb-8">
      <span className="text-sm font-semibold uppercase tracking-widest text-amber-700">
        Giri Murti Coffee
      </span>

      <h1 className="mt-2 text-4xl font-bold text-stone-900">
        Ajukan Permintaan Pembelian
      </h1>

      <p className="mt-3 max-w-2xl text-stone-600">
        Lengkapi data berikut untuk mengirimkan permintaan
        pembelian. Tim kami akan menghubungi Anda untuk
        konfirmasi stok, harga, dan pengiriman.
      </p>
    </div>
  );
}