"use client";

import Image from "next/image";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  kategori: string;
  span: "normal" | "tall" | "wide"; // masonry sizing hint
}

// ─── Data — ganti src & title dengan data nyata ──────────────────────────────

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "/images/kopi/kebun-pagi.jpg",
    alt: "Perkebunan Kopi Girimurti di lereng Gunung Arjuno",
    title: "Perkebunan Kopi Girimurti",
    kategori: "Kebun",
    span: "tall",
  },
  {
    id: 2,
    src: "/images/kopi/panen.jpg",
    alt: "Proses panen buah kopi merah",
    title: "Panen Buah Kopi",
    kategori: "Panen",
    span: "normal",
  },
  {
    id: 3,
    src: "/images/kopi/proses-kering.jpg",
    alt: "Proses pengeringan biji kopi",
    title: "Pengeringan Biji Kopi",
    kategori: "Pascapanen",
    span: "normal",
  },
  {
    id: 4,
    src: "/images/kopi/sangrai.jpg",
    alt: "Proses penyangraian kopi Girimurti",
    title: "Penyangraian Kopi",
    kategori: "Produksi",
    span: "wide",
  },
  {
    id: 5,
    src: "/images/kopi/kemasan.jpg",
    alt: "Produk kopi kemasan Girimurti",
    title: "Produk Kopi Girimurti",
    kategori: "Produk",
    span: "normal",
  },
  {
    id: 6,
    src: "/images/kopi/kebun-pagi.jpg",
    alt: "Suasana kebun kopi di pagi hari",
    title: "Kebun Kopi Arjuno",
    kategori: "Kebun",
    span: "tall",
  },
];

const kategoriColor: Record<string, string> = {
  Kebun: "bg-emerald-900/70 text-emerald-300",
  Panen: "bg-amber-900/70 text-amber-300",
  Pascapanen: "bg-sky-900/70 text-sky-300",
  Produksi: "bg-rose-900/70 text-rose-300",
  Produk: "bg-violet-900/70 text-violet-300",
};

// ─── Placeholder SVGs per kategori ───────────────────────────────────────────

const placeholderGradients: Record<string, string> = {
  Kebun: "from-emerald-950 to-green-900",
  Panen: "from-amber-950 to-stone-900",
  Pascapanen: "from-sky-950 to-slate-900",
  Produksi: "from-rose-950 to-stone-900",
  Produk: "from-violet-950 to-slate-900",
};

function Placeholder({ item }: { item: GalleryItem }) {
  const grad = placeholderGradients[item.kategori] ?? "from-stone-950 to-stone-900";
  return (
    <div className={`absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br ${grad}`}>
      <svg className="w-12 h-12 opacity-20 mb-2" fill="none" stroke="white" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p className="text-white/20 text-xs text-center px-4">
        /images/gallery/foto-{item.id}.jpg
      </p>
    </div>
  );
}

// ─── Masonry spans ────────────────────────────────────────────────────────────
// CSS grid rows: normal=2, tall=3, wide=2 (full width on desktop)

function spanClass(span: GalleryItem["span"]) {
  if (span === "tall") return "row-span-2";
  if (span === "wide") return "md:col-span-2";
  return "row-span-1";
}

// ─── Variants ─────────────────────────────────────────────────────────────────

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const headingVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { delay: d, duration: 0.55, ease: "easeOut" },
  }),
};

const lightboxVariant: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.28, ease: "easeOut" } },
  exit:   { opacity: 0, scale: 0.94, transition: { duration: 0.2, ease: "easeIn" } },
};

const backdropVariant: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  item,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNext, onPrev]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        variants={backdropVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Panel — stop propagation so clicking image doesn't close */}
        <motion.div
          key="panel"
          variants={lightboxVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-4xl flex flex-col gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-stone-900 shadow-2xl">
            {imgError ? (
              <Placeholder item={item} />
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                quality={90}
                className="object-cover"
                onError={() => setImgError(true)}
              />
            )}
          </div>

          {/* Caption row */}
          <div className="flex items-center justify-between gap-3 px-1">
            <div>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1 ${kategoriColor[item.kategori] ?? "bg-stone-800 text-stone-400"}`}>
                {item.kategori}
              </span>
              <p className="text-white font-bold text-base leading-snug">{item.title}</p>
              <p className="text-stone-500 text-xs mt-0.5">{item.alt}</p>
            </div>
            <p className="shrink-0 text-stone-600 text-xs font-mono tabular-nums">
              {item.id} / {total}
            </p>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-stone-800 hover:bg-red-600 border border-stone-700 flex items-center justify-center text-stone-400 hover:text-white transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev / Next */}
          <button
            onClick={onPrev}
            aria-label="Foto sebelumnya"
            className="absolute left-2 top-1/3 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-amber-700 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={onNext}
            aria-label="Foto berikutnya"
            className="absolute right-2 top-1/3 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-amber-700 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Gallery Card ─────────────────────────────────────────────────────────────

function GalleryCard({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      variants={cardVariant}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-stone-900
        shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-black/60
        hover:-translate-y-1 transition-shadow duration-300
        ${spanClass(item.span)}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Buka foto: ${item.title}`}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {/* Image / Placeholder */}
      <div className="absolute inset-0">
        {imgError ? (
          <Placeholder item={item} />
        ) : (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={82}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Gradient overlay — always subtle, stronger on hover */}
      <div className="absolute inset-0 bg-linear-to-t
        from-black/70 via-black/10 to-transparent
        opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Kategori badge — top left */}
      <div className="absolute top-3 left-3 z-10">
        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${kategoriColor[item.kategori] ?? "bg-stone-800/80 text-stone-300"}`}>
          {item.kategori}
        </span>
      </div>

      {/* Zoom icon — top right, appears on hover */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
        <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>

      {/* Bottom info — slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4
        translate-y-2 group-hover:translate-y-0
        opacity-0 group-hover:opacity-100
        transition-all duration-300 ease-out">
        <p className="text-white font-bold text-sm leading-snug drop-shadow-sm">
          {item.title}
        </p>
        <p className="text-white/60 text-xs mt-0.5 line-clamp-1">{item.alt}</p>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openLightbox  = (i: number) => setActiveIndex(i);
  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const prevPhoto     = useCallback(() =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + galleryItems.length) % galleryItems.length)),
  []);
  const nextPhoto     = useCallback(() =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % galleryItems.length)),
  []);

  return (
    <>
      <section id="galeri"
         className="relative py-24 bg-stone-950"
>
        {/* Ambient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-64 bg-emerald-950/30 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-950/20 rounded-full blur-3xl pointer-events-none" />

        {/* Hairlines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-stone-700/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-stone-700/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <div className="text-center mb-14">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={headingVariant}
              custom={0}
              className="inline-flex items-center gap-2 mb-5"
            >
              <span className="h-px w-8 bg-emerald-700" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">
                Galeri Kegiatan
              </span>
              <span className="h-px w-8 bg-emerald-700" />
            </motion.div>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={headingVariant}
              custom={0.08}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-3"
              style={{ color: "#f0fdf4" }}
            >
              Momen{" "}
              <span className="relative inline-block text-emerald-400">
                Kopi Giri Murti 
                <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M2 5 Q50 1 100 5 Q150 9 198 4"
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
              className="text-stone-400 text-sm max-w-xl mx-auto"
            >
              Dokumentasi perjalanan Kopi Girimurti mulai dari kebun, panen,
pengolahan, hingga produk kopi yang menjadi warisan masyarakat Desa Tlekung.
            </motion.p>
          </div>

          {/* ── Masonry grid ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
              auto-rows-[220px] gap-4"
          >
            {galleryItems.map((item, i) => (
              <GalleryCard
                key={item.id}
                item={item}
                onClick={() => openLightbox(i)}
              />
            ))}
          </motion.div>

          {/* ── View all CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            className="mt-12 flex justify-center"
          >
            <a
              href="#galeri"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full
                bg-emerald-800/30 hover:bg-emerald-700/50
                border border-emerald-700/40 hover:border-emerald-500/60
                text-emerald-300 hover:text-white text-sm font-semibold
                backdrop-blur-sm hover:-translate-y-0.5 active:translate-y-0
                transition-all duration-200"
            >
              Lihat Semua Foto
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox (portal-like, outside section) ── */}
      {activeIndex !== null && (
        <Lightbox
          item={galleryItems[activeIndex]}
          total={galleryItems.length}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </>
  );
}