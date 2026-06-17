"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const highlights = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: "Pemerintahan Transparan & Akuntabel",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    text: "Potensi Pertanian & Agrowisata Unggulan",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    text: "Layanan Digital untuk Seluruh Warga",
  },
];

const miniStats = [
  { value: "2.847", label: "Kepala Keluarga" },
  { value: "1.200+", label: "Hektar Lahan Hijau" },
  { value: "12+", label: "Tahun Inovasi Desa" },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { delay: d, duration: 0.5, ease: "easeOut" },
  }),
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function AboutSection() {
  return (
    <section id="profil" 
    className="relative py-24 bg-white dark:bg-gray-950 overflow-hidden">

      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#16a34a 1px, transparent 1px), linear-gradient(90deg, #16a34a 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative blobs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-emerald-100 dark:bg-emerald-950/40 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-16 right-0 w-72 h-72 bg-orange-50 dark:bg-orange-950/20 rounded-full blur-3xl opacity-70 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Image ─────────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeLeft}
            className="relative"
          >
            {/* Main image frame */}
            <div className="relative rounded-4xl overflow-hidden aspect-4/5 max-h-145 shadow-2xl shadow-green-900/20 group">
              <Image
                src="/images/tlekung.jpg"
                alt="Suasana Desa Tlekung, Kecamatan Junrejo, Kota Batu"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={88}
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Inner overlay — subtle gradient bottom */}
              <div className="absolute inset-0 bg-linear-to-t from-green-950/40 via-transparent to-transparent" />

              {/* Floating label bottom-left */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-white tracking-wide">
                    Desa Tlekung, Kota Batu
                  </span>
                </div>
                <div className="px-3 py-2 rounded-2xl bg-orange-500/90 backdrop-blur-sm text-white text-xs font-bold shadow-lg">
                  Est. 1958
                </div>
              </div>
            </div>

            {/* Decorative card — top right overlap */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
              className="absolute -top-5 -right-5 w-40 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth    ={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200">Smart Village</span>
              </div>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-snug">
                Desa berbasis digital dan inovasi pelayanan publik
              </p>
            </motion.div>

            {/* Decorative card — bottom left overlap */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
              className="absolute -bottom-5 -left-5 w-44 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 border border-gray-100 dark:border-gray-800"
            >
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Ketinggian wilayah</p>
              <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 leading-none">
                ±950 <span className="text-sm font-semibold text-gray-400">mdpl</span>
              </p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                Udara sejuk khas Kota Batu
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right: Content ──────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeRight}
            className="flex flex-col"
          >
            {/* Badge */}
            <motion.div custom={0} variants={fadeUp} className="inline-flex items-center gap-2 mb-4 self-start">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                bg-emerald-50 dark:bg-emerald-900/30
                border border-emerald-200 dark:border-emerald-800
                text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd" />
                </svg>
                Tentang Desa
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              custom={0.08}
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-4"
            >
              Mengenal Lebih Dekat{" "}
              <span className="relative text-emerald-700 dark:text-emerald-400">
                Desa Tlekung
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 220 8" preserveAspectRatio="none">
                  <path d="M2 5 Q55 1 110 5 Q165 9 218 4"
                    stroke="#f97316" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h2>

            {/* Body text */}
            <motion.p
              custom={0.16}
              variants={fadeUp}
              className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-3"
            >
              Desa Tlekung terletak di Kecamatan Junrejo, Kota Batu, Jawa Timur, pada ketinggian
              sekitar 950 meter di atas permukaan laut. Dengan udara yang sejuk dan tanah yang subur,
              desa ini dikenal sebagai salah satu sentra pertanian hortikultura — terutama apel, sayuran,
              dan tanaman hias — yang memasok kebutuhan kawasan Malang Raya.
            </motion.p>
            <motion.p
              custom={0.22}
              variants={fadeUp}
              className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-8"
            >
              Didukung infrastruktur yang terus berkembang dan semangat gotong royong masyarakat,
              Desa Tlekung berkomitmen mewujudkan tata kelola pemerintahan yang transparan,
              inovatif, dan berbasis teknologi demi kesejahteraan seluruh warganya.
            </motion.p>

            {/* Highlight list */}
            <motion.ul custom={0.3} variants={fadeUp} className="space-y-3 mb-10">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    {h.icon}
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300 leading-snug pt-1.5">
                    {h.text}
                  </span>
                </li>
              ))}
            </motion.ul>

            {/* Mini stats row */}
            <motion.div
              custom={0.38}
              variants={fadeUp}
              className="grid grid-cols-3 gap-3 mb-10 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
            >
              {miniStats.map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <span className="text-xl sm:text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 leading-none">
                    {s.value}
                  </span>
                  <span className="text-[11px] text-gray-400 dark:text-gray-500 mt-1 leading-tight">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div custom={0.44} variants={fadeUp} className="flex flex-wrap gap-3">
              <Link
  href="#sejarah"
  className="inline-flex items-center gap-2 px-5 py-3 rounded-full
    bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold
    shadow-md shadow-emerald-900/20 hover:shadow-emerald-700/30
    hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
>
  Profil Lengkap
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
</Link>
              <Link
                href="#potensi"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full
                  border border-emerald-200 dark:border-emerald-800
                  text-emerald-700 dark:text-emerald-400 text-sm font-semibold
                  hover:bg-emerald-50 dark:hover:bg-emerald-900/30
                  hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Lihat Potensi Desa
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}