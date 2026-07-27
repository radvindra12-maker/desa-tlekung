"use client";

import { news } from "@/data/news";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NewsItem {
  id: number;
  slug: string;
  thumbnail: string;
  tanggal: string;
  bulan: string;
  tahun: string;
  kategori: string;
  judul: string;
  ringkasan: string;
  penulis: string;
  inisial: string;
  readTime: number;
  featured: boolean;
}

// ─── Data dummy — ganti dengan data nyata / API call ─────────────────────────



// ─── Kategori config ──────────────────────────────────────────────────────────

const kategoriConfig: Record<
  string,
  {
    bg: string;
    text: string;
    dot: string;
  }
> = {
  "Kopi Girimurti": {
    bg: "bg-emerald-900/50",
    text: "text-emerald-300",
    dot: "bg-emerald-400",
  },
};

function getKategori(k: string) {
  return kategoriConfig[k] ?? {
    bg: "bg-stone-800/70", text: "text-stone-300", dot: "bg-stone-400",
  };
}

// ─── Thumbnail placeholder ────────────────────────────────────────────────────

const thumbGradients = [
  "from-emerald-950 to-green-900",
  "from-rose-950 to-stone-900",
  "from-amber-950 to-stone-900",
];

function ThumbPlaceholder({ index }: { index: number }) {
  const grad = thumbGradients[index % thumbGradients.length];
  return (
    <div className={`absolute inset-0 flex items-center justify-center bg-linear-to-br ${grad}`}>
      <svg className="w-14 h-14 opacity-20" fill="none" stroke="white" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  );
}

// ─── Variants ─────────────────────────────────────────────────────────────────

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const headingVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { delay: d, duration: 0.55, ease: "easeOut" },
  }),
};

// ─── Featured Card (card pertama — lebih besar) ───────────────────────────────

function FeaturedCard({ item, index }: { item: NewsItem; index: number }) {
  const [imgError, setImgError] = useState(false);
  const k = getKategori(item.kategori);

  return (
   <motion.article
  variants={cardVariant}
  className="
    relative
    z-10
    group
    flex
    flex-col
    lg:flex-row
    overflow-hidden
    rounded-2xl
    bg-stone-900
    border
    border-stone-800
    hover:border-emerald-800/50
    shadow-xl
    shadow-black/40
    hover:shadow-2xl
    hover:shadow-black/60
    hover:-translate-y-1
    transition-all
    duration-300
    lg:col-span-3
  "
>
      {/* Thumbnail — larger for featured */}
      <div className="relative w-full lg:w-[45%] aspect-video lg:aspect-auto shrink-0 overflow-hidden">
        {imgError ? (
          <ThumbPlaceholder index={index} />
        ) : (
          <Image
            src={item.thumbnail}
            alt={item.judul}
            loading="lazy"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            quality={85}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent to-stone-900/60 hidden lg:block" />
        <div className="absolute inset-0 bg-linear-to-t from-stone-950/60 to-transparent lg:hidden" />

        {/* Date badge */}
        <div className="absolute top-4 left-4 flex flex-col items-center px-3 py-2 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 text-center leading-none">
          <span className="text-xl font-extrabold text-white">{item.tanggal}</span>
          <span className="text-[10px] font-semibold text-white/60 uppercase tracking-wider">{item.bulan} {item.tahun}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-6 lg:p-8 flex-1">
        <div>
          {/* Kategori + read time */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${k.bg} ${k.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${k.dot}`} />
              {item.kategori}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-stone-500">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {item.readTime} menit baca
            </span>
          </div>

          <h3 className="text-xl lg:text-2xl font-extrabold text-stone-100 leading-snug mb-3
            group-hover:text-emerald-300 transition-colors duration-300">
            {item.judul}
          </h3>

          <p className="text-stone-400 text-sm leading-relaxed line-clamp-3 mb-6">
            {item.ringkasan}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-900/50 text-emerald-400 flex items-center justify-center text-xs font-bold">
              {item.inisial}
            </div>
            <span className="text-xs text-stone-500">{item.penulis}</span>
          </div>
          <Link
            href={`/berita/${item.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full
              bg-emerald-800/40 hover:bg-emerald-700 border border-emerald-700/40 hover:border-emerald-500
              text-emerald-300 hover:text-white text-xs font-semibold
              transition-all duration-200 group/btn"
          >
            Baca Selengkapnya
            <svg
              className="w-3.5 h-3.5 translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-200"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Regular Card ─────────────────────────────────────────────────────────────

function RegularCard({ item, index }: { item: NewsItem; index: number }) {
  const [imgError, setImgError] = useState(false);
  const k = getKategori(item.kategori);

  return (
   <motion.article
  variants={cardVariant}
  className="
    relative
    z-10
    group
    flex
    flex-col
    overflow-hidden
    rounded-2xl
    bg-stone-900
    border
    border-stone-800
    hover:border-stone-700
    shadow-lg
    shadow-black/30
    hover:shadow-xl
    hover:shadow-black/50
    hover:-translate-y-1
    transition-all
    duration-300
  "
>
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden shrink-0">
        {imgError ? (
          <ThumbPlaceholder index={index} />
        ) : (
          <Image
            src={item.thumbnail}
            alt={item.judul}
            loading="lazy"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            quality={82}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-stone-950/60 via-transparent to-transparent" />

        {/* Date */}
        <div className="absolute top-3 left-3 flex flex-col items-center px-2.5 py-1.5 rounded-xl
          bg-black/50 backdrop-blur-sm border border-white/10 text-center leading-none">
          <span className="text-base font-extrabold text-white">{item.tanggal}</span>
          <span className="text-[9px] font-semibold text-white/60 uppercase tracking-wide">{item.bulan}</span>
        </div>

        {/* Kategori */}
        <div className="absolute bottom-3 left-3">
          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${k.bg} ${k.text}`}>
            <span className={`w-1 h-1 rounded-full ${k.dot}`} />
            {item.kategori}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-sm font-bold text-stone-100 leading-snug mb-2.5
          group-hover:text-emerald-300 transition-colors duration-300 line-clamp-2">
          {item.judul}
        </h3>
        <p className="text-xs text-stone-500 leading-relaxed line-clamp-3 flex-1 mb-4">
          {item.ringkasan}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3.5 border-t border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-stone-800 text-stone-400 flex items-center justify-center text-[9px] font-bold">
              {item.inisial}
            </div>
            <span className="text-[11px] text-stone-600">{item.penulis}</span>
          </div>
          <Link
            href={`/berita/${item.slug}`}
            className="inline-flex items-center gap-1 text-[11px] font-semibold
              text-emerald-500 hover:text-orange-400 transition-colors duration-200 group/link"
          >
            Baca
            <svg
              className="w-3 h-3 translate-x-0 group-hover/link:translate-x-0.5 transition-transform duration-200"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function NewsSection() {
  const featured = news.filter((n) => n.featured);
  const regular  = news.filter((n) => !n.featured);

  return (
    <section id="berita"
    className="bg-[var(--beige)]">

      {/* Ambient */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-950/25 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-950/15 rounded-full blur-3xl pointer-events-none" />

      {/* Hairlines */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-stone-700/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-stone-700/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
          <div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={headingVariant}
              custom={0}
              className="inline-flex items-center gap-2 mb-4"
            >
              <span className="h-px w-8 bg-emerald-700" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">
                Informasi Terkini
              </span>
              <span className="h-px w-8 bg-emerald-700" />
            </motion.div>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={headingVariant}
              custom={0.08}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight"
              style={{ color: "#f0fdf4" }}
            >
              Berita{" "}
              <span className="relative inline-block text-emerald-400">
                & Informasi
                <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 180 8" preserveAspectRatio="none">
                  <path d="M2 5 Q45 1 90 5 Q135 9 178 4"
                    stroke="#f97316" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={headingVariant}
              custom={0.16}
              className="mt-3 text-stone-400 text-sm max-w-md"
            >
              Ikuti perkembangan terbaru seputar panen, pengolahan, promosi,
dan kegiatan Kopi Girimurti.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            className="shrink-0"
          >
            <Link
              href="#berita"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                border border-emerald-700/50 hover:border-emerald-500
                text-emerald-400 hover:text-white text-sm font-semibold
                hover:bg-emerald-800/40 transition-all duration-200"
            >
              Semua Berita
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* ── News grid ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {/* Featured cards */}
          {featured.map((item, i) => (
            <FeaturedCard key={item.id} item={item} index={i} />
          ))}
          {/* Regular cards */}
          {regular.map((item, i) => (
            <RegularCard key={item.id} item={item} index={i + featured.length} />
          ))}
        </motion.div>

        {/* ── Ticker / pengumuman strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
          className="mt-10 flex items-center gap-3 p-4 rounded-xl
            bg-emerald-950/30 border border-emerald-900/40"
        >
          <span className="shrink-0 w-7 h-7 rounded-full bg-emerald-800 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </span>
          <p className="text-sm text-stone-600">
            <span className="font-semibold text-emerald-400">Pengumuman:</span>{" "}
            <span className="font-semibold text-emerald-400">Informasi:</span>{" "}
Kopi Girimurti terus dikembangkan sebagai produk unggulan masyarakat
Desa Tlekung melalui peningkatan kualitas budidaya dan pengolahan kopi.{" "}
            <Link href="#berita" className="underline underline-offset-2 text-emerald-500 hover:text-orange-400 transition-colors">
              Selengkapnya
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}