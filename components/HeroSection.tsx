"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
// ─── Types ────────────────────────────────────────────────────────────────────

interface StatItem {
  value: string;
  label: string;
  icon: React.ReactNode;
  suffix?: string;
}

// ─── Data statistik ───────────────────────────────────────────────────────────

const stats: StatItem[] = [
  {
    value: "6",
    label: "Rukun Warga",
    suffix: "RW",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
      </svg>
    ),
  },
  {
    value: "24",
    label: "Rukun Tetangga",
    suffix: "RT",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    value: "8547",
    label: "Total Penduduk",
    suffix: "Jiwa",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    value: "629",
    label: "Luas Wilayah",
    suffix: "km²",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
];

// ─── Format display value ─────────────────────────────────────────────────────
// Converts raw number back to display string per stat index

function formatValue(raw: number, index: number): string {
  if (index === 2) {
    // Penduduk: dot-separated thousands  e.g. 8.547
    return Math.floor(raw)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  if (index === 3) {
    // Luas wilayah: divide back and show 2 decimal with comma  e.g. 6,29
    return (raw / 100).toFixed(2).replace(".", ",");
  }
  return Math.floor(raw).toString();
}

// ─── Animated counter hook ────────────────────────────────────────────────────
// FIX: initialise display with the formatted final value so there is never
// a synchronous setState call inside the effect body.

function useCountUp(
  rawTarget: number,
  duration: number,
  started: boolean,
  index: number
): string {
  // Initialise directly — avoids the "setState synchronously in effect" error
  const [display, setDisplay] = useState(() => formatValue(rawTarget, index));
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!started) return;

    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = rawTarget * eased;

      setDisplay(formatValue(current, index));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [rawTarget, duration, started, index]);

  return display;
}

// ─── Stat card ────────────────────────────────────────────────────────────────

// Raw numeric targets (no formatting inside the data array)
const statTargets = [6, 24, 8547, 629];

function StatCard({
  item,
  index,
  started,
}: {
  item: StatItem;
  index: number;
  started: boolean;
}) {
  const count = useCountUp(statTargets[index], 1600 + index * 150, started, index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1 + index * 0.1, duration: 0.55, ease: "easeOut" }}
      className="group relative flex flex-col items-center gap-1 px-5 py-4 rounded-2xl
        bg-white/10 backdrop-blur-md border border-white/20
        hover:bg-white/20 hover:border-white/40 hover:-translate-y-1
        transition-all duration-300 cursor-default min-w-27.5"
    >
      <span className="text-emerald-300 group-hover:text-orange-300 transition-colors duration-300 mb-1">
        {item.icon}
      </span>

      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-extrabold text-white tabular-nums leading-none">
          {count}
        </span>
        <span className="text-xs font-semibold text-emerald-300 group-hover:text-orange-300 transition-colors">
          {item.suffix}
        </span>
      </div>

      <p className="text-xs text-white/60 text-center leading-tight">{item.label}</p>

      {/* Bottom accent line */}
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-orange-400 rounded-full group-hover:w-3/4 transition-all duration-300" />
    </motion.div>
  );
}

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: d, duration: 0.65, ease: "easeOut" },
  }),
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HeroSection() {
  const [statsStarted, setStatsStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStatsStarted(true), 1300);
    return () => clearTimeout(t);
  }, []);

  return (
     <section id="beranda" 
     className="relative overflow-hidden min-h-screen bg-linear-to-b from-(--dark-green) via-(--bg-primary) to-(--bg-primary)">

    {/* ── Overlays ── */}
     <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-transparent" />
    


     

      {/* ── Content ── */}
      <div className="relative z-20 flex flex-col flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-8">

        {/* Heading block */}
        <div className="flex-1 flex flex-col justify-center max-w-3xl">

          {/* Eyebrow */}
          <motion.div
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeSlideUp}
            className="inline-flex items-center gap-2 self-start mb-5"
          >
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
              bg-white/10 backdrop-blur-sm border border-white/20
              text-xs font-semibold tracking-wider text-emerald-300 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              WARISAN KOPI • SEJAK 1958 • DESA TLEKUNG
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            custom={0.35}
            initial="hidden"
            animate="visible"
            variants={fadeSlideUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] mb-2"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {" "}
            <span className="relative inline-block text-(--beige)">
              Giri Murti
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M2 6 Q50 2 100 6 Q150 10 198 5" stroke="#8B5E34" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          {/* Sub-heading */}
          <motion.p
            custom={0.48}
            initial="hidden"
            animate="visible"
            variants={fadeSlideUp}
            className="text-lg sm:text-xl font-semibold text-white/80 tracking-wide mt-4 mb-3"
          >
            Warisan Rasa dari Lereng Kawi Sejak 1958
          </motion.p>

          {/* Description */}
          <motion.p
            custom={0.58}
            initial="hidden"
            animate="visible"
            variants={fadeSlideUp}
            className="text-sm sm:text-base text-white/60 leading-relaxed max-w-xl mb-8"
          >
            Kopi Girimurti merupakan warisan perkebunan kopi Desa Tlekung yang telah tumbuh dan berkembang sejak tahun 1958. Ditanam di kawasan pegunungan dengan iklim yang mendukung, Kopi Girimurti menghadirkan cita rasa khas yang menjadi kebanggaan masyarakat setempat.
          </motion.p>

          {/* CTA */}
          <motion.div
            custom={0.7}
            initial="hidden"
            animate="visible"
            variants={fadeSlideUp}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="#profil"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full
                bg-(--green) hover:bg-(--dark-green) text-white font-semibold text-sm
                shadow-lg shadow-[var(--green)]-900/40 hover:shadow-[var(--green)]-600/40
                hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Pelajari Sejarah
              <svg
                className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="#kontak"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full
                bg-white/10 hover:bg-white/20 backdrop-blur-sm
                border border-white/30 hover:border-orange-400/60
                text-white font-semibold text-sm6
                hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <svg className="w-4 h-4 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Lihat Produk
            </Link>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-10 hidden sm:flex items-center gap-2 text-white/30 text-xs"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
            Gulir untuk melihat lebih
          </motion.div>
        </div>

        {/* ── Stat cards ── */}
        <div className="mt-auto pt-8">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.6, ease: "easeOut" }}
            className="h-px bg-white/10 mb-6 origin-left"
          />

          <div className="flex flex-wrap gap-3 sm:gap-4">
            {stats.map((item, i) => (
              <StatCard key={item.label} item={item} index={i} started={statsStarted} />
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="hidden lg:flex items-center ml-auto self-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                bg-orange-500/15 backdrop-blur-sm border border-orange-400/30
                text-xs text-orange-300 font-medium">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Data Resmi 2024
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}