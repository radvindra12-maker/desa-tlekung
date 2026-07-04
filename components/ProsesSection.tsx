"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { budidaya, pengolahan } from "./proses/ProsesData";
import TahapSection from "./proses/TahapSection";


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

  PERJALANAN KOPI GIRIMURTI

</span>

       <h2
  className="mt-8 text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
  style={{
    fontFamily: "Georgia, 'Times New Roman', serif",
  }}
>

Perjalanan

<br />

<span className="text-amber-400">
  Kopi Girimurti
</span>

</h2>
        <div className="flex justify-center my-8">

          <div className="w-36 h-1 rounded-full bg-linear-to-r from-emerald-500 via-amber-400 to-emerald-500" />

        </div>

        <p className="max-w-3xl mx-auto text-lg leading-8 text-stone-400">

         Perjalanan Kopi Girimurti dimulai dari kebun milik petani Gangsiran puthuk,
melalui proses budidaya, panen, hingga pengolahan pascapanen sebelum
akhirnya menjadi secangkir kopi dengan cita rasa khas yang siap dinikmati.
        </p>

      </motion.div>

<div className="mt-10 flex flex-wrap justify-center gap-4">

  <span className="rounded-full border border-emerald-700/40 bg-emerald-900/20 px-5 py-2 text-sm text-emerald-300">
    🌿 Tahap Budidaya
  </span>

  <span className="rounded-full border border-amber-700/40 bg-amber-900/20 px-5 py-2 text-sm text-amber-300">
    ☕ Tahap Pengolahan
  </span>

</div>



    {/* =========================
    TAHAP 1 - BUDIDAYA
========================= */}

<TahapSection
  subtitle="🌿 Tahap 1"
  title="Budidaya di Kebun"
  description="
  Perjalanan Kopi Girimurti dimulai dari kebun,
  mulai dari proses penanaman,
  pemetikan buah kopi merah,
  hingga rambang sebagai sortasi alami.
  "
  data={budidaya}
/>

<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="my-32 text-center"
>

  <div className="flex items-center justify-center gap-6">

    <div className="w-24 h-px bg-emerald-700"/>

    <div className="
      rounded-full
      bg-amber-900/20
      border
      border-amber-600/30
      px-8
      py-4
      text-amber-300
      font-semibold
    ">

      ☕ Memasuki Tahap Pengolahan

    </div>

    <div className="w-24 h-px bg-emerald-700"/>

  </div>

</motion.div>

<TahapSection
  subtitle="☕ Tahap 2"
  title="Pengolahan Pascapanen"
  description="
  Setelah melewati proses budidaya,
  kopi memasuki tahap pengolahan
  hingga siap diseduh menjadi
  secangkir Kopi Girimurti.
  "
  data={pengolahan}
/>

 {/* =========================
    TRANSISI
========================= */}

<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="my-32 text-center"
>

  <div className="flex items-center justify-center gap-6">

    <div className="h-px w-24 bg-emerald-700" />

    <span
      className="
        rounded-full
        border
        border-amber-700/40
        bg-amber-900/20
        px-8
        py-4
        text-lg
        font-semibold
        text-amber-300
      "
    >
      ☕ Memasuki Tahap Pengolahan
    </span>

    <div className="h-px w-24 bg-emerald-700" />

  </div>

  <p className="mt-8 max-w-2xl mx-auto text-stone-400 leading-8">

    Setelah melalui proses budidaya dan pemilihan buah kopi terbaik,
    kopi Girimurti memasuki tahapan pengolahan untuk menjaga kualitas,
    aroma, dan cita rasa sebelum siap dinikmati.

  </p>

</motion.div>
</div>
</section>
);
}
