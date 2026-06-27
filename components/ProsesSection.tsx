"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const proses = [
  {
    nomor: "01",
    judul: "Pembelian Hasil Panen",
    badge: "Tahap Awal",
    image: "/images/proses/panen.jpg",
    deskripsi:
      "Pendopo Kopi Girimurti membeli hasil panen kopi dari petani Desa Tlekung sebagai bahan baku utama.",
  },
  {
    nomor: "02",
    judul: "Pengeringan",
    badge: "Natural Drying",
    image: "/images/proses/pengeringan.jpg",
    deskripsi:
      "Biji kopi dijemur hingga mencapai kadar air ideal agar kualitas tetap terjaga.",
  },
  {
    nomor: "03",
    judul: "Sortasi",
    badge: "Quality Control",
    image: "/images/proses/sortasi.jpg",
    deskripsi:
      "Biji kopi dipilih berdasarkan ukuran dan kualitas sehingga hanya biji terbaik yang diproses.",
  },
  {
    nomor: "04",
    judul: "Sangrai",
    badge: "Roasting",
    image: "/images/proses/sangrai.jpg",
    deskripsi:
      "Roasting dilakukan menggunakan profil sangrai tertentu agar menghasilkan karakter rasa khas.",
  },
  {
    nomor: "05",
    judul: "Penggilingan",
    badge: "Final Process",
    image: "/images/proses/giling.jpg",
    deskripsi:
      "Setelah disangrai, kopi digiling hingga siap dikemas maupun diseduh.",
  },
];

export default function ProsesSection() { 
  return (
  <section
    id="proses"
    className="relative overflow-hidden bg-stone-950 py-28"
  >
    {/* Background Glow */}
    <div className="absolute inset-0 pointer-events-none">

      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-emerald-600/10 blur-[140px]" />

      <div className="absolute bottom-0 right-1/4 w-112.5 h-112.5 rounded-full bg-amber-500/10 blur-[180px]" />

    </div>

    <div className="relative max-w-7xl mx-auto px-6">

      {/* HEADER */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-28"
      >

        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-700/40 bg-emerald-900/30 px-5 py-2 text-xs uppercase tracking-[0.3em] text-emerald-300">

          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

          PROSES PENGOLAHAN

        </span>

        <h2
          className="mt-8 text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          Dari Kebun

          <br />

          <span className="text-amber-400">
            Hingga Secangkir Kopi
          </span>

        </h2>

        <div className="flex justify-center my-8">

          <div className="w-36 h-1 rounded-full bg-linear-to-r from-emerald-500 via-amber-400 to-emerald-500" />

        </div>

        <p className="max-w-3xl mx-auto text-lg leading-8 text-stone-400">

          Setiap kemasan Kopi Girimurti berasal dari hasil panen petani
          Desa Tlekung yang diproses secara bertahap mulai dari
          pembelian hasil panen, pengeringan, sortasi,
          sangrai, hingga menjadi bubuk kopi berkualitas.

        </p>

      </motion.div>

      {/* Timeline akan kita buat di sini */}
<div className="space-y-32">

  {proses.map((item, index) => {

    const reverse = index % 2 === 1;

    return (
<>
      <motion.div
        key={item.nomor}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className={`
          grid
          lg:grid-cols-2
          gap-16
          items-center
          ${reverse ? "lg:[&>*:first-child]:order-2" : ""}
        `}
      >

        {/* Kolom kiri */}

       <motion.div
  whileHover={{ y: -8 }}
  transition={{ duration: 0.35 }}
  className={`
    group
    relative
    overflow-hidden
    rounded-[28px]
    border
    border-stone-800
    bg-stone-900
    shadow-2xl
    shadow-black/50
    ${reverse ? "lg:order-1" : "lg:order-2"}
  `}
>

  <div className="relative h-105">
  



    <Image
      src={item.image}
      alt={item.judul}
      fill
      className="
        object-cover
        transition-transform
        duration-700
        group-hover:scale-110
      "
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

    {/* Badge Tahap */}
    <div
      className="
        absolute
        top-5
        right-5
        rounded-full
        bg-black/60
        backdrop-blur-md
        border
        border-white/10
        px-4
        py-2
        text-sm
        text-white
        font-semibold
      "
    >
      Tahap {item.nomor}
    </div>

    <span className="text-xs uppercase tracking-[0.35em] text-emerald-400 font-semibold">
  PROCESS {item.nomor}
</span>
<h3 className="mt-6 text-4xl font-bold text-white">
  {item.judul}
</h3>
</div>
</motion.div>

        {/* Kolom kanan */}

       <div
  className={`
    relative
    ${reverse ? "lg:order-2" : "lg:order-1"}
  `}
>

  <div className="absolute -top-10 left-0 text-[90px] lg:text-[120px] font-black text-white/5 select-none">

    {item.nomor}

  </div>

  <span
    className="
      inline-flex
      items-center
      gap-2
      rounded-full
      bg-emerald-900/40
      border
      border-emerald-700/40
      px-4
      py-2
      text-xs
      uppercase
      tracking-[0.2em]
      text-emerald-300
    "
  >

    <span className="w-2 h-2 rounded-full bg-emerald-400"/>

    {item.badge}

  </span>

  <h3 className="mt-8 text-4xl font-bold text-white leading-tight">

    {item.judul}

  </h3>

  <p className="mt-6 text-stone-400 leading-8">

    {item.deskripsi}

  </p>

</div>

      </motion.div>
{index !== proses.length - 1 && (
  <div className="lg:col-span-2 flex justify-center">
    <div className="w-24 h-px bg-stone-800" />
  </div>
)}
</>
    );

  })}       
 </div>
</div>
</section>
);
}
