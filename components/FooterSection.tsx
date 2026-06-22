"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import type { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContactItem {
  icon: ReactNode;
  text: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon: ReactNode;
}

interface NavLink {
  label: string;
  href: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#profil" },
  { label: "Sejarah", href: "#sejarah" },
  { label: "Galeri", href: "#galeri" },
  { label: "Berita", href: "#berita" },
  { label: "Kontak", href: "#kontak" },
];

const layananLinks: NavLink[] = [
  { label: "Sejarah Kopi Girimurti", href: "#sejarah" },
  { label: "Proses Produksi", href: "#produksi" },
  { label: "Galeri Perkebunan", href: "#galeri" },
  { label: "Berita & Kegiatan", href: "#berita" },
  { label: "Hubungi Kami", href: "#kontak" },
];

const contactInfo: ContactItem[] = [
  {
    icon: (
      <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    text:  "Desa Tlekung, Kecamatan Junrejo, Kota Batu, Jawa Timur",
  },
  {
    icon: (
      <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    text: "(0341) 592XXX",
  },
  {
    icon: (
      <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    text: "kopigirimurti@gmail.com",
  },
  {
    icon: (
      <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: "Senin - Jumat: 08.00 - 16.00 WIB",
  },
];

const socialLinks: SocialLink[] = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.8} />
        <circle cx="12" cy="12" r="4" strokeWidth={1.8} />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

// ─── Animation variants ────────────────────────────────────────────────────────
// FIX: ease must be a named string preset, not a number[].
// Using "easeOut" instead of cubic-bezier array to satisfy Framer Motion's Easing type.

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer id="kontak">

      {/* Wave divider */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="w-full h-14 fill-white dark:fill-gray-900">
          <path d="M0,32 C360,56 1080,0 1440,32 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ambient glow blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative pt-24 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Main 4-column grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">

            {/* Col 1 — Brand */}
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 shrink-0">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <circle cx="20" cy="20" r="19" fill="url(#fEmblemGrad)" stroke="url(#fStrokeGrad)" strokeWidth="1.5" />
                    <path d="M8 28 L14 20 L20 24 L26 16 L32 28" stroke="white" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
                    <path d="M20 8 L20 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="20" cy="7" r="1.5" fill="white" />
                    <circle cx="18" cy="10" r="1.2" fill="white" fillOpacity="0.8" />
                    <circle cx="22" cy="10" r="1.2" fill="white" fillOpacity="0.8" />
                    <circle cx="17" cy="13" r="1" fill="white" fillOpacity="0.6" />
                    <circle cx="23" cy="13" r="1" fill="white" fillOpacity="0.6" />
                    <defs>
                      <linearGradient id="fEmblemGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#16a34a" /><stop offset="1" stopColor="#065f46" />
                      </linearGradient>
                      <linearGradient id="fStrokeGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#4ade80" /><stop offset="1" stopColor="#34d399" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-green-400">
                    Warisan Kopi
                  </p>
                  <p className="text-xl font-extrabold tracking-tight text-white" style={{ fontFamily: "Georgia, serif" }}>
                    Kopi Giri Murti
                  </p>
                </div>
              </div>

              <p className="text-sm text-green-200/70 leading-relaxed mb-6">
              Kopi Girimurti merupakan warisan perkebunan kopi yang telah menjadi bagian dari 
              identitas masyarakat Desa Tlekung sejak tahun 1958. Hingga saat ini kopi ini terus dikembangkan sebagai produk unggulan yang mendukung perekonomian masyarakat lokal.
              </p>

              <div className="flex items-center gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange-500 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 hover:scale-110"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Col 2 — Navigasi */}
            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
            >
              <h3 className="text-sm font-bold uppercase tracking-widest text-orange-400 mb-5">
                Navigasi
              </h3>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-green-200/70 hover:text-white transition-colors duration-200"
                    >
                      <span className="w-4 h-px bg-green-600 group-hover:bg-orange-400 group-hover:w-6 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Col 3 — Layanan */}
            <motion.div
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
            >
              <h3 className="text-sm font-bold uppercase tracking-widest text-orange-400 mb-5">
                Eksplorasi
              </h3>
              <ul className="space-y-2.5">
                {layananLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-green-200/70 hover:text-white transition-colors duration-200"
                    >
                      <span className="w-4 h-px bg-green-600 group-hover:bg-orange-400 group-hover:w-6 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              
             </motion.div>
          

            {/* Col 4 — Kontak */}
            <motion.div
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
            >
              <h3 className="text-sm font-bold uppercase tracking-widest text-orange-400 mb-5">
                Kontak Kami
              </h3>
              <ul className="space-y-4">
                {contactInfo.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-green-200/70">
                    <span className="text-orange-400">{item.icon}</span>
                    <span className="leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10" />

          {/* Bottom bar */}
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-green-300/50">
            <p>&copy; {year} Kopi Giri Murti.
              {" "}
              <span className="text-green-300/30">Hak cipta dilindungi.</span>
            </p>
      

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Kembali ke atas"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-orange-500 flex items-center justify-center text-white/60 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}