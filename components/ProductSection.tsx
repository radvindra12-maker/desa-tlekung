"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const products = [
  {
    nama: "Arabica Yellow Caturra",
    proses: "Natural Process",
    berat: "200 gram",
    gambar: "/images/produk/Arabica-YC.jpg",
    warna: "emerald",
    deskripsi:
      "Kopi arabika dengan karakter rasa bersih, aroma floral, serta diproses menggunakan metode Natural Process.",
  },
  {
    nama: "Arabika GP",
    proses: "Natural Process",
    berat: "200 gram",
    gambar: "/images/produk/Arabika-GP.jpg",
    warna: "amber",
    deskripsi:
      "Menghasilkan cita rasa yang seimbang dengan aroma manis dan karakter khas kopi pegunungan Desa Tlekung.",
  },
  {
    nama: "Robusta HN",
    proses: "Honey Process",
    berat: "200 gram",
    gambar: "/images/produk/Robusta-HN.jpg",
    warna: "orange",
    deskripsi:
      "Robusta pilihan dengan body yang kuat, aroma cokelat, dan rasa yang lebih tebal.",
  },
  {
    nama: "Excelsa",
    proses: "Natural Process",
    berat: "200 gram",
    gambar: "/images/produk/Excelsa.jpg",
    warna: "stone",
    deskripsi:
      "Memiliki karakter unik dengan aroma buah serta rasa yang kompleks dan menyegarkan.",
  },
];
export default function ProductSection() {
  return (
    <section
      id="produk"
      className="relative overflow-hidden bg-black py-28"
    >

      <div className="max-w-7xl mx-auto px-6">
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="text-center mb-28"
>

  <span
    className="
      inline-flex
      items-center
      gap-2
      rounded-full
      border
      border-emerald-700/40
      bg-emerald-900/30
      px-5
      py-2
      text-xs
      uppercase
      tracking-[0.3em]
      text-emerald-300
    "
  >

    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

    PRODUK KOPI

  </span>

  <h2
    className="mt-8 text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
    style={{
      fontFamily: "Georgia, 'Times New Roman', serif",
    }}
  >

    Produk

    <br />

    <span className="text-amber-400">

      Kopi Girimurti

    </span>

  </h2>

  <div className="flex justify-center my-8">

    <div className="w-36 h-1 rounded-full bg-linear-to-r from-emerald-500 via-amber-400 to-emerald-500" />

  </div>

  <p className="max-w-3xl mx-auto text-lg leading-8 text-stone-400">

    Nikmati berbagai pilihan kopi unggulan Desa Tlekung yang diproses secara
    profesional dengan karakter rasa khas dari lereng pegunungan Kota Batu.

  </p>

</motion.div>
<div className="space-y-32">

  {products.map((product, index) => {

    const reverse = index % 2 === 1;

    return (

      <motion.div
        key={product.nama}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className={`
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-20
          items-center
          ${reverse ? "lg:[&>*:first-child]:order-2" : ""}
        `}
      >
    <div
  className="
    relative
    overflow-hidden
    rounded-[30px]
    border
    border-stone-800
    bg-stone-900
    shadow-2xl
    shadow-black/50
  "
>

  <div className="relative h-140">

    <Image
      src={product.gambar}
      alt={product.nama}
      fill
      className="object-cover"
    />

  </div>

</div>
<div className="space-y-6">

  <span className="inline-flex rounded-full bg-emerald-900/40 border border-emerald-700/40 px-4 py-2 text-emerald-300 text-xs uppercase tracking-widest">
    {product.proses}
  </span>

  <h3 className="text-5xl font-bold text-white">
    {products[0].nama}
  </h3>

  <p className="text-stone-400 leading-8">
    {product.deskripsi}
  </p>

  <div className="flex flex-wrap gap-3 pt-4">

    <span className="rounded-full bg-stone-900 border border-stone-700 px-4 py-2 text-sm text-white">
      ☕ Fresh Roast
    </span>

    <span className="rounded-full bg-stone-900 border border-stone-700 px-4 py-2 text-sm text-white">
      📦 {product.berat}
    </span>

    <span className="rounded-full bg-stone-900 border border-stone-700 px-4 py-2 text-sm text-white">
      🌿 Single Origin
    </span>

  </div>
<div className="pt-6">

  <button
    className="
      rounded-full
      bg-emerald-600
      hover:bg-emerald-500
      transition-all
      duration-300
      px-8
      py-4
      text-white
      font-semibold
      shadow-lg
      shadow-emerald-900/40
    "
  >
    Lihat Detail Produk →
  </button>

</div>
</div>
</motion.div>

        );
    })}    
      </div>
        </div>
    </section>
  );
}
