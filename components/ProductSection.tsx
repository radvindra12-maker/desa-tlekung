"use client";

import { products } from "../data/products";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";


export default function ProductSection() {
  return (
    <section
      id="produk"
      className="relative overflow-hidden bg-[var(--cream)]"
    >
          {/* Background Glow */}

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute top-0 left-1/4 w-112.5 h-112.5 rounded-full bg-emerald-600/10 blur-[180px]" />

        <div className="absolute bottom-0 right-1/4 w-125 h-125 rounded-full bg-amber-500/10 blur-[220px]" />

      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
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

            Berbagai pilihan kopi unggulan hasil budidaya petani Desa Tlekung
            yang diproses secara profesional untuk menghasilkan cita rasa khas
            dari lereng pegunungan Kota Batu.

          </p>

        </motion.div>

        <div className="space-y-40">
          {products.map((product, index) => {

  const reverse = index % 2 === 1;

  return (
<>
    <motion.div
      key={product.nama}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
      }}
      className={`
        grid
        lg:grid-cols-2
        gap-20
        items-center
        ${reverse ? "lg:[&>*:first-child]:order-2" : ""}
      `}
    >

      {/* ===========================
          FOTO PRODUK
      =========================== */}

      <motion.div
        whileHover={{
          y: -8,
        }}
        transition={{
          duration: .35
        }}
        className={`
          group
          relative
          overflow-hidden
          rounded-[30px]
          border
          border-stone-800
          bg-stone-900
          shadow-2xl
          shadow-black/50
          ${reverse ? "lg:order-1" : "lg:order-2"}
        `}
      >

        <div className="relative h-140">

          <Image
            src={product.image}
            alt={product.nama}
            fill
            className="
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
            "
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

          {/* Badge */}

          <div
            className="
              absolute
              top-6
              right-6
              rounded-full
              bg-black/60
              backdrop-blur-md
              border
              border-white/10
              px-5
              py-2
              text-sm
              font-semibold
              text-green-300
            "
          >

            {product.proses}

          </div>

          {/* Berat */}

          <div
            className="
              absolute
              bottom-6
              left-6
              rounded-full
              bg-emerald-600
              px-5
              py-3
              text-green-300
              font-semibold
              shadow-xl
            "
          >

            {product.berat}

          </div>

        </div>

      </motion.div>

      {/* ===========================
          INFORMASI PRODUK
      =========================== */}

      <div
        className={`
          max-w-xl
          space-y-8
          ${reverse ? "lg:order-2" : "lg:order-1"}
        `}
      >

        <span
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-emerald-700/40
            bg-emerald-900/40
            px-4
            py-2
            text-xs
            uppercase
            tracking-[0.25em]
            text-emerald-300
          "
        >

          <span className="w-2 h-2 rounded-full bg-emerald-400" />

          Specialty Coffee

        </span>

        <h3
          className="text-5xl font-bold text-yellow-400 leading-tight"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >

          {product.nama}

        </h3>

        <p className="text-lg leading-8 text-stone-500">

          {product.deskripsi}

        </p>

                {/* ===========================
            FLAVOR NOTES
        =========================== */}

        <div>

          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-stone-500">

            Flavor Notes

          </p>

          <div className="flex flex-wrap gap-3">

            {product.tasting.map((note) => (

              <span
                key={note}
                className="
                  rounded-full
                  border
                  border-stone-700
                  bg-[var(--gold)]
                  px-4
                  py-2
                  text-sm
                  text-stone-600
                  transition-all
                  duration-300
                  hover:border-emerald-500
                  hover:bg-emerald-900/20
                "
              >

                {note}

              </span>

            ))}

          </div>

        </div>

        {/* ===========================
            INFO
        =========================== */}

        <div className="flex flex-wrap gap-4">

          <span className="rounded-full border border-stone-700 px-4 py-2 text-sm text-green-600">

            ☕ Fresh Roast

          </span>

          <span className="rounded-full border border-stone-700 px-4 py-2 text-sm text-green-600">

            📦 {product.berat}

          </span>

          <span className="rounded-full border border-stone-700 px-4 py-2 text-sm text-green-600">

            🌿 Single Origin

          </span>

        </div>

        {/* ===========================
            BUTTON
        =========================== */}

        <div className="pt-4 relative z-50">

          <Link
    href={`/produk/${product.slug}`}
    className="inline-flex
        items-center
        gap-2
        rounded-full
        bg-emerald-600
        hover:bg-emerald-500
        px-7
        py-3
        font-semibold
        text-white
        transition-all
        duration-300
        hover:translate-x-1
    "
>
    Lihat Detail Produk
    <span>→</span>
</Link>

        </div>

      </div>

    </motion.div>

    {/* Divider */}

    {index !== products.length - 1 && (

      <div className="flex justify-center">

        <div className="h-px w-40 bg-stone-800" />

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