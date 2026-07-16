"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Narasumber {
  nama: string;
  peran: string;
  deskripsi: string;
  inisial: string;
}

// ─── Data placeholder — ganti dengan data nyata ───────────────────────────────

const VIDEO_ID = "dQw4w9WgXcQ"; // ← ID dari URL YouTube
// youtube.com/watch?v=dQw4w9WgXcQ → ambil bagian ini
const narasumber: Narasumber = {
  nama: "Pak Natan",
  peran: "Pemilik Perkebunan Kopi Girimurti",
  deskripsi:
    "Generasi ketiga penerus perkebunan kopi keluarga yang telah berdiri sejak tahun 1940-an di lereng Gunung Kawi, Desa Tlekung.",
  inisial: "NP",
};

const kutipan =
  "Kopi bukan hanya hasil panen, tetapi bagian dari identitas dan sejarah Desa Tlekung.";

const fakta = [
  { value: "80+", label: "Tahun Sejarah" },
  { value: "3", label: "Generasi Penerus" },
  { value: "100%", label: "Organik" },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: d, duration: 0.6, ease: "easeOut" },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

// ─── Play button SVG ─────────────────────────────────────────────────────────

function PlayIcon() {
  return (
    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

// ─── Video Player ─────────────────────────────────────────────────────────────

function VideoPlayer() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black/70 group">
      {playing ? (
        // Live iframe
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
          title="Wawancara Pemilik Perkebunan Kopi Girimurti"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        // Thumbnail / poster state
        <>
          {/* Cinematic dark poster */}
          <div className="absolute inset-0 bg-linear-to-br from-stone-950 via-amber-950/60 to-stone-950" />

          {/* Decorative film-grain texture */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Widescreen bars — cinematic feel */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-black/60 z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-black/60 z-10" />

          {/* SVG coffee illustration as placeholder */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <svg viewBox="0 0 300 200" fill="none" className="w-72 h-48">
              <ellipse cx="150" cy="100" rx="80" ry="60" stroke="#d97706" strokeWidth="2" />
              <path d="M150 45 Q130 70 130 100 Q130 130 150 155" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
              <ellipse cx="80" cy="80" rx="30" ry="40" stroke="#a16207" strokeWidth="1.5" opacity="0.6" />
              <ellipse cx="220" cy="120" rx="28" ry="36" stroke="#a16207" strokeWidth="1.5" opacity="0.6" />
            </svg>
          </div>

          {/* Center: play button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-6">
            <button
              onClick={() => setPlaying(true)}
              aria-label="Putar video wawancara"
              className="group/play relative flex items-center justify-center w-20 h-20 rounded-full
                bg-amber-600/90 hover:bg-amber-500 border-2 border-amber-400/60 hover:border-amber-300
                shadow-2xl shadow-amber-900/60 hover:shadow-amber-600/50
                hover:scale-110 active:scale-95 transition-all duration-300"
            >
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full bg-amber-500/30 animate-ping" />
              <PlayIcon />
            </button>

            <div className="text-center px-4">
              <p className="text-amber-300 text-xs font-semibold uppercase tracking-widest mb-1">
                Klik untuk memutar
              </p>
              <p className="text-white/50 text-xs">
                Video Dokumenter &bull; Kopi Girimurti
              </p>
            </div>
          </div>

          {/* Bottom-left: duration badge */}
          <div className="absolute bottom-10 left-4 z-20">
            <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white/70 text-xs font-mono">
              ••:•• &nbsp;Wawancara Eksklusif
            </span>
          </div>

          {/* Top-right: quality badge */}
          <div className="absolute top-10 right-4 z-20">
            <span className="px-2 py-0.5 rounded bg-amber-600/80 text-white text-[10px] font-bold tracking-wider">
              HD
            </span>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function InterviewSection() {
  return (
    <section 
    id="wawancara"
  className=" bg-linear-to-b from-(--cream) via-(--cream) to-(--coffee)"
    >



      {/* Ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-96 bg-amber-900/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-green-950/40 rounded-full blur-3xl pointer-events-none" />

      {/* Top + bottom hairlines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-800/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-stone-700/40 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ───────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-12"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="h-px w-8 bg-amber-700" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
              Dokumenter Eksklusif
            </span>
            <span className="h-px w-8 bg-amber-700" />
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4"
            style={{ color: "#8B4513" }}
          >
          
            Perjalanan Kopi Girimurti{" "}
            <span className="relative inline-block text-amber-400">
              dari Masa ke Masa
              <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 320 8" preserveAspectRatio="none">
                <path
                  d="M2 5 Q80 1 160 5 Q240 9 318 4"
                  stroke="#16a34a"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Wawancara eksklusif bersama pemilik perkebunan Kopi Girimurti yang menceritakan sejarah,
            perkembangan, serta harapan untuk masa depan kopi Desa Tlekung.
          </p>
        </motion.div>

        {/* ── Video player ─────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeIn}
          className="mb-10"
        >
          <VideoPlayer />
        </motion.div>

        {/* ── Narasumber + quote row ───────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">

          {/* Narasumber card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.1}
            className="flex items-start gap-4 p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-800/50 transition-colors duration-300"
          >
            {/* Avatar */}
            <div className="shrink-0 w-12 h-12 rounded-full bg-linear-to-br from-amber-700 to-amber-900 flex items-center justify-center text-amber-200 font-extrabold text-base shadow-lg">
              {narasumber.inisial}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-0.5">
                Narasumber
              </p>
              <p className="text-sm font-bold text-amber-300 leading-snug">
                {narasumber.nama}
              </p>
              <p className="text-xs text-stone-500 mb-2">{narasumber.peran}</p>
              <p className="text-xs text-stone-400 leading-relaxed">
                {narasumber.deskripsi}
              </p>
            </div>
          </motion.div>

          {/* Quote card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.2}
            className="relative flex flex-col justify-center p-5 rounded-2xl bg-amber-950/30 border border-amber-900/40 overflow-hidden"
          >
            {/* Large decorative quotation mark */}
            <span
              className="absolute top-2 left-4 text-7xl leading-none text-amber-800/30 font-serif select-none pointer-events-none"
              aria-hidden
            >
              &ldquo;
            </span>

            <blockquote className="relative z-10 text-sm sm:text-base text-amber-200/90 italic leading-relaxed font-medium pl-3 border-l-2 border-amber-600">
              {kutipan}
            </blockquote>

            <p className="mt-3 text-xs text-stone-500 pl-3">
              — {narasumber.nama}, {narasumber.peran}
            </p>
          </motion.div>
        </div>

        {/* ── Facts strip ──────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.3}
          className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-10"
        >
          {fakta.map((f, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5 px-6 py-3 rounded-2xl bg-stone-900 border border-stone-800">
              <span className="text-2xl font-extrabold text-amber-400">{f.value}</span>
              <span className="text-[11px] text-stone-500 uppercase tracking-wide">{f.label}</span>
            </div>
          ))}
        </motion.div>

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.38}
          className="flex flex-wrap justify-center gap-3"
        >
          <a
            href={`https://www.youtube.com/watch?v=${VIDEO_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full
              bg-amber-700 hover:bg-amber-600 text-white font-semibold text-sm
              shadow-lg shadow-amber-900/40 hover:shadow-amber-700/30
              hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Tonton di YouTube
          </a>

          <a
            href="#potensi"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full
              border border-stone-700 hover:border-amber-700/60
              text-stone-400 hover:text-amber-400 text-sm font-semibold
              hover:bg-stone-900 transition-all duration-200"
          >
            Pelajari Potensi Kopi
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}