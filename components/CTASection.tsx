"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

// ─── Data quick links ─────────────────────────────────────────────────────────

const quickLinks = [
  {
    label: "Tentang Kopi",
    href: "#profil",
    icon: "☕",
  },
  {
    label: "Sejarah",
    href: "#sejarah",
    icon: "📜",
  },
  {
    label: "Berita",
    href: "#berita",
    icon: "📰",
  },
  {
    label: "Galeri",
    href: "#galeri",
    icon: "📸",
  },
];
  
// ─── Variants ─────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { delay: d, duration: 0.6, ease: "easeOut" },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const linkItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-stone-950 via-green-950 to-green-950">

      {/* ── Decorative background elements ── */}

      {/* Central radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-175 h-100 bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Smaller accent glows */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-green-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #4ade80 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-emerald-700/40 to-transparent" />

      {/* Decorative arc lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.07]">
        <svg className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-225" viewBox="0 0 900 300" fill="none">
          <ellipse cx="450" cy="300" rx="440" ry="220" stroke="#4ade80" strokeWidth="1" />
          <ellipse cx="450" cy="300" rx="340" ry="160" stroke="#4ade80" strokeWidth="1" />
          <ellipse cx="450" cy="300" rx="240" ry="100" stroke="#4ade80" strokeWidth="1" />
        </svg>
      </div>

      {/* ── Content ── */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="flex items-center gap-2 px-4 py-2 rounded-full
              bg-emerald-900/50 border border-emerald-700/50
              text-xs font-bold uppercase tracking-widest text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Warisan Sejak 1958
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.1}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5 text-white max-w-3xl"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Mari Lestarikan{" "}
            <span className="relative inline-block text-emerald-400">
              Warisan Kopi
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 280 10" preserveAspectRatio="none">
                <path d="M2 6 Q70 1 140 6 Q210 11 278 5"
                  stroke="#f97316" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>{" "}
            Girimurti
          </motion.h2>

          {/* Description */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.2}
            className="text-green-200/60 text-base sm:text-lg leading-relaxed max-w-2xl mb-10"
          >
            Kopi Girimurti bukan hanya produk kopi, tetapi juga bagian dari sejarah,
             budaya, dan identitas masyarakat Desa Tlekung yang terus dijaga dan dikembangkan hingga saat ini.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.3}
            className="flex flex-wrap items-center justify-center gap-3 mb-14"
          >
            {/* Primary */}
<a
  href="https://wa.me/6282139108285?text=Halo%20saya%20ingin%20mengetahui%20informasi%20tentang%20Kopi%20Girimurti"
  target="_blank"
  rel="noopener noreferrer"
  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full
    bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm
    shadow-lg shadow-emerald-900/50 hover:shadow-emerald-600/40
    hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
>
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>

  Hubungi Kami

  <svg
    className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M9 5l7 7-7 7"
    />
  </svg>
</a>
              

            {/* Secondary */}
            <Link
              href="#galeri"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full
                bg-white/10 hover:bg-white/20 backdrop-blur-sm
                border border-white/20 hover:border-orange-400/50
                text-white font-semibold text-sm
                hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <svg className="w-4 h-4 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Lihat Galeri
            </Link>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-xs h-px bg-linear-to-r from-transparent via-emerald-700/50 to-transparent mb-10 origin-center"
          />

          {/* Quick links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-wrap justify-center gap-3"
          >
            {quickLinks.map((link) => (
              <motion.div key={link.href} variants={linkItem}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-full
                    bg-green-900/40 hover:bg-emerald-800/60
                    border border-green-800/50 hover:border-emerald-600/60
                    text-green-300/80 hover:text-white text-xs font-semibold
                    backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span className="text-emerald-500 group-hover:text-orange-400 transition-colors duration-200">
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}