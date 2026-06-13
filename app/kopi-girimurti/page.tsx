"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// DATA — ganti dengan data nyata
// ═══════════════════════════════════════════════════════════════════════════════

const YOUTUBE_ID = "VIDEO_ID"; // ← ganti dengan ID video YouTube

const timeline = [
  {
    tahun: "1940-an",
    judul: "Benih Pertama",
    narasi:
      "Kakek buyut keluarga Girimurti menanam baris pertama kopi arabika di lahan seluas satu hektar. Biji dibawa dari Malang, ditanam di ketinggian 950 mdpl dengan tanah vulkanik Arjuno.",
  },
  {
    tahun: "1958",
    judul: "Nama Girimurti Lahir",
    narasi:
      "Perkebunan resmi diberi nama Girimurti — dari bahasa Sansekerta: giri (gunung) dan murti (perwujudan). Produksi mencapai satu ton pertama, dijual ke pengepul Malang Kota.",
  },
  {
    tahun: "1970-an",
    judul: "Masa Kejayaan",
    narasi:
      "Lima belas keluarga bergabung mengelola lahan bersama. Kopi Girimurti mulai dikenal di pasar Surabaya dan Bali. Sistem pengelahan basah (wet process) pertama kali diterapkan.",
  },
  {
    tahun: "2005",
    judul: "Krisis & Bangkit",
    narasi:
      "Harga kopi dunia anjlok. Tiga tahun penuh perjuangan mempertahankan kebun. Generasi ketiga memutuskan beralih ke metode organik penuh — keputusan yang kelak menjadi keunggulan.",
  },
  {
    tahun: "2018",
    judul: "Sertifikasi Organik",
    narasi:
      "Kopi Girimurti mendapat sertifikasi organik nasional. Permintaan dari kafe-kafe Jakarta dan Bali melonjak. Kemasan baru diluncurkan dengan branding modern mempertahankan elemen tradisional.",
  },
  {
    tahun: "Kini",
    judul: "Warisan Hidup",
    narasi:
      "Produksi ±5 ton per tahun, diekspor ke tiga negara. Wisata kebun dibuka untuk umum. Generasi keempat sedang menyiapkan kedai kopi pertama di lokasi perkebunan.",
  },
];

const produk = [
  {
    nama: "Arabika Arjuno Natural",
    proses: "Natural Process",
    profil: "Coklat, Karamel, Buah Tropis",
    berat: "200g / 500g",
    ketinggian: "950–1.050 mdpl",
    harga: "Rp 85.000",
    icon: "🌿",
    unggulan: true,
  },
  {
    nama: "Robusta Girimurti",
    proses: "Wet Hulled",
    profil: "Earthy, Tembakau, Dark Chocolate",
    berat: "200g / 500g",
    ketinggian: "800–950 mdpl",
    harga: "Rp 65.000",
    icon: "☕",
    unggulan: false,
  },
  {
    nama: "Blend Tlekung Signature",
    proses: "Honey Process",
    profil: "Madu, Rempah, Vanilla",
    berat: "250g",
    ketinggian: "Blend multi-ketinggian",
    harga: "Rp 95.000",
    icon: "✨",
    unggulan: false,
  },
];

const dampak = [
  { angka: "15+", label: "Keluarga Petani", sub: "Terlibat langsung dalam produksi" },
  { angka: "3×", label: "Peningkatan Pendapatan", sub: "Dibanding era pra-organik" },
  { angka: "80%", label: "Produk Lokal Desa", sub: "Bahan baku 100% dari Tlekung" },
  { angka: "3", label: "Negara Tujuan Ekspor", sub: "Jepang, Korea, Belanda" },
];

const galeriKopi = [
  { src: "/images/kopi/kebun-pagi.jpg",     alt: "Kebun kopi saat pagi hari",              span: "col-span-2 row-span-2" },
  { src: "/images/kopi/panen.jpg",           alt: "Proses panen biji kopi merah",            span: "col-span-1 row-span-1" },
  { src: "/images/kopi/proses-kering.jpg",   alt: "Penjemuran biji kopi natural process",    span: "col-span-1 row-span-1" },
  { src: "/images/kopi/sangrai.jpg",         alt: "Proses sangrai kopi tradisional",         span: "col-span-1 row-span-1" },
  { src: "/images/kopi/kemasan.jpg",         alt: "Kemasan produk Kopi Girimurti",           span: "col-span-1 row-span-1" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// MOTION VARIANTS
// ═══════════════════════════════════════════════════════════════════════════════

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { delay: d, duration: 0.65, ease: "easeOut" },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (d: number) => ({
    opacity: 1,
    transition: { delay: d, duration: 0.7, ease: "easeOut" },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardV: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// ═══════════════════════════════════════════════════════════════════════════════
// SHARED SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <span className="h-px w-7 bg-amber-700" />
      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-500">
        {children}
      </span>
      <span className="h-px w-7 bg-amber-700" />
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] text-amber-50">
      {children}
    </h2>
  );
}

function GreenLine() {
  return (
    <svg viewBox="0 0 240 10" preserveAspectRatio="none" className="absolute -bottom-2 left-0 w-full">
      <path d="M2 6 Q60 1 120 6 Q180 11 238 5"
        stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function ImgOrPlaceholder({
  src, alt, gradient = "from-stone-900 to-stone-800",
}: { src: string; alt: string; gradient?: string }) {
  const [err, setErr] = useState(false);
  return err ? (
    <div className={`absolute inset-0 bg-linear-to-br ${gradient} flex items-center justify-center`}>
      <svg className="w-12 h-12 opacity-15" fill="none" stroke="white" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  ) : (
    <Image src={src} alt={alt} fill className="object-cover" quality={85}
      sizes="(max-width: 768px) 100vw, 50vw" onError={() => setErr(true)} />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. HERO
// ═══════════════════════════════════════════════════════════════════════════════

function HeroKopi() {
  const [imgErr, setImgErr] = useState(false);

  return (
    <section className="relative w-full h-screen min-h-150 flex flex-col overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {imgErr ? (
          <div className="absolute inset-0 bg-linear-to-br from-stone-950 via-amber-950 to-green-950" />
        ) : (
          <Image src="/images/kopi-girimurti-hero.jpg" alt="Kebun Kopi Girimurti" fill priority
            quality={90} className="object-cover object-center" sizes="100vw"
            onError={() => setImgErr(true)} />
        )}
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 z-10 bg-black/55" />
      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/30 via-transparent to-black/90" />
      <div className="absolute inset-0 z-10 bg-linear-to-r from-black/40 via-transparent to-transparent" />

      {/* Glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-700/10 rounded-full blur-[100px] z-10 pointer-events-none" />

      {/* Breadcrumb */}
      <div className="relative z-20 pt-28 px-4 sm:px-8 lg:px-16">
        <motion.div custom={0.2} initial="hidden" animate="visible" variants={fadeIn}>
          <nav className="flex items-center gap-2 text-xs text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-white/60">Kopi Girimurti</span>
          </nav>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-end flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 lg:px-16 pb-16">
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
            bg-amber-900/50 border border-amber-700/40 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Warisan Desa Tlekung · Est. 1958
          </span>
        </motion.div>

        <motion.h1
          custom={0.1}
          initial="hidden" animate="visible" variants={fadeUp}
          className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.02] mb-4"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Kopi{" "}
          <span className="relative inline-block text-amber-400">
            Girimurti
            <svg viewBox="0 0 200 10" preserveAspectRatio="none" className="absolute -bottom-2 left-0 w-full">
              <path d="M2 6 Q50 1 100 5 Q150 9 198 5"
                stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        </motion.h1>

        <motion.p custom={0.2} initial="hidden" animate="visible" variants={fadeUp}
          className="text-white/60 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
          Empat generasi merawat tanah dan tradisi di lereng Gunung Arjuno.
          Biji yang tumbuh dalam diam, berbicara lewat cita rasa yang tak terlupakan.
        </motion.p>

        <motion.div custom={0.3} initial="hidden" animate="visible" variants={fadeUp}
          className="flex flex-wrap gap-3">
          <a href="#produk"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full
              bg-amber-700 hover:bg-amber-600 text-white font-semibold text-sm
              shadow-lg shadow-amber-900/40 hover:-translate-y-0.5 transition-all duration-200">
            Lihat Produk
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <a href="#cerita"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full
              bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20
              text-white font-semibold text-sm hover:-translate-y-0.5 transition-all duration-200">
            Baca Sejarah
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-6 right-6 hidden sm:flex flex-col items-center gap-1.5">
          <motion.div animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
            <svg className="w-4 h-4 text-white/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
          <span className="text-[10px] text-white/25 uppercase tracking-widest">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. CERITA / SEJARAH
// ═══════════════════════════════════════════════════════════════════════════════

function CeritaSection() {
  return (
    <section id="cerita" className="relative py-28 bg-stone-950">
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-amber-900/30 to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-amber-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="relative rounded-3xl overflow-hidden aspect-4/5 max-h-135 shadow-2xl shadow-black/60 group">
            <ImgOrPlaceholder src="/images/kopi/sejarah.jpg" alt="Sejarah Kopi Girimurti"
              gradient="from-amber-950 to-stone-900" />
            <div className="absolute inset-0 bg-linear-to-t from-stone-950/60 to-transparent" />
            {/* Floating badge */}
            <div className="absolute bottom-5 left-5 px-4 py-3 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10">
              <p className="text-xs text-white/50 mb-0.5">Berdiri sejak</p>
              <p className="text-2xl font-extrabold text-amber-400 leading-none">1958</p>
            </div>
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]
              [&>img]:transition-transform [&>img]:duration-700 [&>img]:group-hover:scale-105" />
          </motion.div>

          {/* Text */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0.1} className="flex flex-col">
            <Eyebrow>Tentang Kami</Eyebrow>
            <SectionHeading>
              Lebih dari Sekadar{" "}
              <span className="relative text-amber-400">
                Kopi
                <GreenLine />
              </span>
            </SectionHeading>

            <div className="mt-6 space-y-4 text-stone-400 text-[15px] leading-relaxed">
              <p>
                Di ketinggian 950 meter di atas permukaan laut, di bawah naungan pohon pisang dan lamtoro
                yang menjaga kelembaban tanah, tumbuh biji-biji kopi yang menyimpan kenangan empat generasi
                keluarga Girimurti.
              </p>
              <p>
                Sejak kakek buyut menanam baris pertama arabika pada dekade 1940-an, kebun ini bukan sekadar
                sumber nafkah — ia adalah identitas. Setiap musim panen membawa ritual yang sama: tangan-tangan
                terampil memilih buah merah satu per satu, diproses dengan sabar, dijemur di bawah matahari
                Arjuno yang tegas namun ramah.
              </p>
              <p>
                Kini, generasi keempat membawa Kopi Girimurti ke panggung nasional dan internasional, tanpa
                melupakan cara lama yang menjadi rahasia cita rasanya.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { v: "±12 Ha", l: "Luas Kebun" },
                { v: "950 mdpl", l: "Ketinggian" },
                { v: "100%", l: "Organik" },
                { v: "4 Gen", l: "Penerus" },
              ].map((s) => (
                <div key={s.l} className="px-4 py-3 rounded-2xl bg-stone-900 border border-stone-800">
                  <p className="text-lg font-extrabold text-amber-400">{s.v}</p>
                  <p className="text-xs text-stone-500 mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. TIMELINE
// ═══════════════════════════════════════════════════════════════════════════════

function TimelineSection() {
  const [active, setActive] = useState(5);

  return (
    <section className="relative py-24 bg-linear-to-b from-stone-950 to-stone-900 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-stone-700/40 to-transparent" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp} custom={0} className="text-center mb-16">
          <Eyebrow>Perjalanan Waktu</Eyebrow>
          <SectionHeading>
            Dari{" "}
            <span className="relative text-amber-400">
              Benih
              <GreenLine />
            </span>{" "}
            ke Dunia
          </SectionHeading>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4.75 sm:left-1/2 top-0 bottom-0 w-px bg-stone-800" />

          <div className="space-y-0">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              const isActive = active === i;

              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  custom={i * 0.06}
                  className={`relative flex items-start gap-6 sm:gap-0 pb-10 cursor-pointer
                    ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"}`}
                  onClick={() => setActive(i)}
                >
                  {/* Content bubble */}
                  <div className={`flex-1 sm:px-10 pl-12 sm:pl-0 ${isLeft ? "sm:text-right" : "sm:text-left"}`}>
                    <motion.div
                      animate={isActive
                        ? { backgroundColor: "rgb(28 25 23)", borderColor: "rgb(180 83 9 / 0.5)" }
                        : { backgroundColor: "rgb(28 25 23)", borderColor: "rgb(41 37 36)" }
                      }
                      transition={{ duration: 0.25 }}
                      className="inline-block p-5 rounded-2xl border transition-colors duration-200 max-w-sm w-full"
                    >
                      <span className={`text-xs font-bold uppercase tracking-widest mb-1 block
                        ${isActive ? "text-amber-500" : "text-stone-600"}`}>
                        {item.tahun}
                      </span>
                      <h3 className={`text-base font-bold mb-2 transition-colors ${isActive ? "text-amber-300" : "text-stone-400"}`}>
                        {item.judul}
                      </h3>
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="text-sm text-stone-500 leading-relaxed overflow-hidden"
                          >
                            {item.narasi}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  {/* Dot — absolute for mobile, centered for desktop */}
                  <div className="absolute left-0 sm:static sm:shrink-0 sm:w-10 flex justify-center pt-5">
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300
                      ${isActive
                        ? "bg-amber-700 border-amber-500 shadow-lg shadow-amber-900/50"
                        : "bg-stone-900 border-stone-700 hover:border-amber-800"
                      }`}>
                      <div className={`w-2.5 h-2.5 rounded-full ${isActive ? "bg-amber-200" : "bg-stone-700"}`} />
                    </div>
                  </div>

                  {/* Empty side for alternating layout */}
                  <div className="hidden sm:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4. GALERI
// ═══════════════════════════════════════════════════════════════════════════════

function GaleriSection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox === null) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", h);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", h); };
  }, [lightbox]);

  return (
    <section className="relative py-24 bg-stone-900">
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-stone-700/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp} custom={0} className="text-center mb-12">
          <Eyebrow>Galeri</Eyebrow>
          <SectionHeading>
            Melihat{" "}
            <span className="relative text-amber-400">
              Lebih Dekat
              <GreenLine />
            </span>
          </SectionHeading>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-3 grid-rows-2 gap-3 h-120"
        >
          {galeriKopi.map((foto, i) => (
            <motion.div
              key={i}
              variants={cardV}
              className={`relative overflow-hidden rounded-2xl cursor-zoom-in group ${foto.span}`}
              onClick={() => setLightbox(i)}
            >
              <ImgOrPlaceholder src={foto.src} alt={foto.alt} gradient="from-stone-800 to-stone-900" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-3xl aspect-4/3 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <ImgOrPlaceholder src={galeriKopi[lightbox].src} alt={galeriKopi[lightbox].alt}
                gradient="from-stone-900 to-stone-800" />
            </motion.div>
            <button onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5. VIDEO
// ═══════════════════════════════════════════════════════════════════════════════

function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative py-24 bg-stone-950">
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-stone-700/40 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-150 h-72 bg-amber-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp} custom={0} className="text-center mb-10">
          <Eyebrow>Wawancara Eksklusif</Eyebrow>
          <SectionHeading>
            Suara dari{" "}
            <span className="relative text-amber-400">
              Kebun
              <GreenLine />
            </span>
          </SectionHeading>
          <p className="mt-4 text-stone-400 text-sm max-w-lg mx-auto leading-relaxed">
            Dengarkan langsung kisah dari generasi keempat penjaga Kopi Girimurti — tentang tradisi,
            perubahan, dan harapan untuk masa depan kopi Desa Tlekung.
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeIn} custom={0.1}
          className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl shadow-black/70">
          {playing ? (
            <iframe className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="Wawancara Pemilik Kopi Girimurti" allow="autoplay; fullscreen"
              allowFullScreen />
          ) : (
            <>
              <div className="absolute inset-0 bg-linear-to-br from-stone-950 via-amber-950/40 to-stone-950" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                <button onClick={() => setPlaying(true)} aria-label="Putar video"
                  className="relative w-20 h-20 rounded-full bg-amber-700/90 hover:bg-amber-600
                    border-2 border-amber-500/50 shadow-2xl shadow-amber-900/60
                    flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300">
                  <span className="absolute inset-0 rounded-full bg-amber-600/30 animate-ping" />
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <div className="text-center">
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-1">
                    Klik untuk memutar
                  </p>
                  <p className="text-white/30 text-xs">Wawancara Eksklusif · Kopi Girimurti</p>
                </div>
              </div>
              <div className="absolute top-0 left-0 right-0 h-6 bg-black/60" />
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-black/60" />
            </>
          )}
        </motion.div>

        {/* Narasumber */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp} custom={0.2}
          className="mt-6 flex items-center gap-4 p-4 rounded-2xl bg-stone-900 border border-stone-800">
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-amber-700 to-amber-900 flex items-center justify-center text-amber-200 font-extrabold">
            NP
          </div>
          <div>
            <p className="text-amber-300 font-bold text-sm">Nama Pemilik</p>
            <p className="text-stone-500 text-xs">Generasi Keempat · Pemilik Kebun Kopi Girimurti, Desa Tlekung</p>
          </div>
          <blockquote className="ml-auto hidden sm:block max-w-xs border-l-2 border-amber-700 pl-3 text-xs text-stone-400 italic leading-relaxed">
            "Kopi bukan hanya hasil panen, ia adalah identitas dan sejarah desa kami."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 6. PRODUK
// ═══════════════════════════════════════════════════════════════════════════════

function ProdukSection() {
  return (
    <section id="produk" className="relative py-24 bg-stone-900">
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-amber-900/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp} custom={0} className="text-center mb-14">
          <Eyebrow>Produk Unggulan</Eyebrow>
          <SectionHeading>
            Pilih{" "}
            <span className="relative text-amber-400">
              Kopimu
              <GreenLine />
            </span>
          </SectionHeading>
          <p className="mt-4 text-stone-400 text-sm max-w-lg mx-auto">
            Tiga varian unggulan diproses dengan metode berbeda untuk pengalaman minum kopi yang beragam.
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {produk.map((p, i) => (
            <motion.div key={i} variants={cardV}
              className={`relative flex flex-col p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1
                ${p.unggulan
                  ? "bg-amber-950/40 border-amber-700/50 shadow-xl shadow-amber-900/20"
                  : "bg-stone-950 border-stone-800 hover:border-stone-700"
                }`}>
              {p.unggulan && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-amber-700 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg">
                    Terlaris
                  </span>
                </div>
              )}

              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="text-base font-extrabold text-amber-100 mb-1">{p.nama}</h3>
              <span className="inline-block px-2 py-0.5 rounded-full bg-stone-800 text-stone-400 text-[10px] font-semibold mb-4">
                {p.proses}
              </span>

              <div className="space-y-2.5 flex-1 mb-6">
                {[
                  { l: "Profil Rasa", v: p.profil },
                  { l: "Kemasan", v: p.berat },
                  { l: "Ketinggian", v: p.ketinggian },
                ].map((row) => (
                  <div key={row.l} className="flex items-start justify-between gap-2 text-xs">
                    <span className="text-stone-600">{row.l}</span>
                    <span className="text-stone-300 text-right">{row.v}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-800">
                <span className="text-lg font-extrabold text-amber-400">{p.harga}</span>
                <a href="/kontak"
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200
                    ${p.unggulan
                      ? "bg-amber-700 hover:bg-amber-600 text-white"
                      : "border border-stone-700 hover:border-amber-700/50 text-stone-400 hover:text-amber-400"
                    }`}>
                  Pesan
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 7. DAMPAK EKONOMI
// ═══════════════════════════════════════════════════════════════════════════════

function DampakSection() {
  return (
    <section className="relative py-24 bg-stone-950">
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-stone-700/30 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-125 h-64 bg-emerald-950/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}>
            <Eyebrow>Dampak Nyata</Eyebrow>
            <SectionHeading>
              Kopi yang{" "}
              <span className="relative text-emerald-400">
                Menghidupi
                <GreenLine />
              </span>
            </SectionHeading>
            <p className="mt-5 text-stone-400 text-[15px] leading-relaxed">
              Kopi Girimurti bukan hanya produk pertanian — ia adalah ekosistem ekonomi yang menghidupi
              belasan keluarga petani di Desa Tlekung. Setiap cangkir yang dinikmati berkontribusi
              langsung pada kesejahteraan masyarakat desa.
            </p>
            <a href="/kontak"
              className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-full
                border border-emerald-700/50 text-emerald-400 text-sm font-semibold
                hover:bg-emerald-900/30 hover:-translate-y-0.5 transition-all duration-200">
              Kerjasama & Distribusi
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-2 gap-4">
            {dampak.map((d, i) => (
              <motion.div key={i} variants={cardV}
                className="flex flex-col p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-800/50 transition-colors duration-300">
                <span className="text-3xl font-extrabold text-emerald-400 leading-none mb-1">{d.angka}</span>
                <span className="text-sm font-bold text-stone-200 mb-1">{d.label}</span>
                <span className="text-xs text-stone-500 leading-snug">{d.sub}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 8. CTA PENUTUP
// ═══════════════════════════════════════════════════════════════════════════════

function CTAPenutup() {
  return (
    <section className="relative py-28 bg-linear-to-b from-stone-950 via-amber-950/20 to-stone-950 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-amber-800/30 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-175 h-80 bg-amber-900/10 rounded-full blur-[130px]" />
      </div>
      {/* Arc ornaments */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.06]">
        <svg className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-200" viewBox="0 0 800 250" fill="none">
          <ellipse cx="400" cy="250" rx="390" ry="200" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="400" cy="250" rx="290" ry="140" stroke="#d97706" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-8 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp} custom={0}>
          <Eyebrow>Mulai Perjalananmu</Eyebrow>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-amber-50 leading-tight mb-5"
            style={{ fontFamily: "Georgia, serif" }}>
            Rasakan Kopi{" "}
            <span className="text-amber-400">Girimurti</span>
          </h2>
          <p className="text-stone-400 text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Kunjungi kebun kami, pesan produk, atau jalin kerjasama distribusi.
            Kami terbuka untuk siapa pun yang ingin menjadi bagian dari cerita Kopi Girimurti.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a href="/kontak"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full
                bg-amber-700 hover:bg-amber-600 text-white font-semibold text-sm
                shadow-lg shadow-amber-900/40 hover:-translate-y-0.5 transition-all duration-200">
              Hubungi Kami
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <Link href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full
                border border-stone-700 hover:border-amber-700/50 text-stone-400
                hover:text-amber-400 text-sm font-semibold transition-all duration-200">
              Kembali ke Beranda
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export default function KopiGirimurtiPage() {
   return (
    <main className="bg-stone-950 min-h-screen">
      <HeroKopi />
      <CeritaSection />
      <TimelineSection />
      <GaleriSection />
      <VideoSection />
      <ProdukSection />
      <DampakSection />
      <CTAPenutup />
    </main>
  );
}