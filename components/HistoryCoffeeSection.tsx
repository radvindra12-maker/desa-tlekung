"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

interface StatItem {
  label: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
}

// ─── Data — ganti placeholder dengan data nyata ───────────────────────────────

const timelineItems: TimelineItem[] = [
  {
    year: "1940-an",
    title: "Awal Perkebunan",
    desc: "Masyarakat mulai membuka lahan di lereng Gunung Arjuno dan menanam kopi sebagai salah satu komoditas utama yang kemudian menjadi sumber mata pencaharian warga.",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707" />
      </svg>
    ),
  },
  {
    year: "1958-an",
    title: "Perkembangan Kebun",
    desc: "Perkebunan kopi semakin berkembang dengan bertambahnya luas lahan dan jumlah petani yang membudidayakan kopi di Desa Tlekung.",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    year: "1980-2000-an",
    title: "Regenerasi Petani",
    desc: "Pengetahuan mengenai budidaya, pemanenan, dan pengolahan kopi diwariskan kepada generasi berikutnya sehingga kualitas kopi tetap terjaga.",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
      </svg>
    ),
  },
  {
    year: "Kini",
    title: "Pendopo Kopi Giri Murti",
    desc: "Pendopo Kopi Girimurti dibangun sebagai pusat promosi, edukasi, dan pengenalan kopi hasil perkebunan Desa Tlekung kepada masyarakat luas.",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const stats: StatItem[] = [
  {
    label: "Tahun Berdiri",
    value: "1940",
    unit: "",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Luas Kebun",
    value: "±12",
    unit: "Ha",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    label: "Ketinggian",
    value: "950",
    unit: "mdpl",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    label: "Produksi",
    value: "±5",
    unit: "ton/th",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
      </svg>
    ),
  },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { delay: d, duration: 0.5, ease: "easeOut" },
  }),
};

const timelineVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const timelineItem: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ─── Image placeholder (shown when /images/kopi-girimurti.jpg is missing) ─────



// ─── Timeline dot ─────────────────────────────────────────────────────────────

function TimelineDot({ active }: { active: boolean }) {
  return (
    <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-300
      ${active
        ? "bg-amber-600 border-amber-500 shadow-lg shadow-amber-900/40"
        : "bg-stone-800 border-stone-700 group-hover:border-amber-600/60"
      }`}
    >
      <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300
        ${active ? "bg-amber-200" : "bg-stone-600 group-hover:bg-amber-600/50"}`} />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HistoryCoffeeSection() {
  const [activeStep, setActiveStep] = useState(3); // default: "Kini"
 

  return (
    <section 
    id="sejarah"
 className="bg-[var(--bg-coffee)]"
 >
      {/* Background texture */}
      <div
      className="section-fade relative overflow-hidden py-28"
    style={
      {
        "--section-next-bg":"#05080d"
      } as React.CSSProperties
  }
    
/>
<div className="absolute inset-0 pointer-events-none">

  <div className="
      absolute
      top-0
      left-0
      w-[500px]
      h-[500px]
      rounded-full
      bg-[var(--cream)]
      opacity-5
      blur-[180px]
  "/>

  <div className="
      absolute
      bottom-0
      right-0
      w-[500px]
      h-[500px]
      rounded-full
      bg-[var(--green)]
      opacity-10
      blur-[180px]
  "/>

</div>
      {/* Ambient blobs */}
      <div className="absolute top-20 right-0 w-112.5 h-112.5 rounded-full bg-amber-500/8 blur-[220px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-900/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Top divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-800/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section label centered (mobile) / hidden on desktop ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="flex justify-center mb-12 lg:hidden"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full
            bg-amber-900/40 border border-amber-700/40 text-amber-400 text-xs font-bold uppercase tracking-widest">
            ☕ Warisan Desa
          </span>
        </motion.div>

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* ── Left: Image ─────────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeLeft}
            className="relative"
          >
            {/* Main image */}

           <div className="relative h-155 overflow-hidden rounded-[30px]">

  <motion.video
  autoPlay
  muted
  loop
  playsInline
  initial={{ scale: 1 }}
  animate={{ scale: 1.08 }}
  transition={{
    duration: 10,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  }}
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/videos/produk_preview.mp4" 
  type="video/mp4"
  />
</motion.video>
              

              {/* Inner gradient overlays */}
              <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-stone-950/10 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-br from-amber-950/30 via-transparent to-transparent" />

              {/* Bottom label */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[var(--coffee)]/40 backdrop-blur-md border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
                    <span className="text-xs font-semibold text-[var(--cream)]/90 tracking-wide">
                      Kopi Girimurti
                    </span>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-[var(--green)]/80 backdrop-blur-sm text-white text-xs font-bold">
                    Arabika &amp; Robusta
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stat cards */}
  

            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.5, ease: "easeOut" }}
              className="absolute -bottom-4 -left-4 w-48 bg-[rgba(255,255,255,.06)] rounded-2xl p-4 border border-stone-800 shadow-xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-amber-900/50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-stone-300">Organik Bersertifikat</span>
              </div>
              <p className="text-[10px] text-stone-500 leading-snug">
                Diproses tanpa bahan kimia, menjaga cita rasa alami kopi pegunungan
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right: Content ──────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeRight}
            className="flex flex-col pt-2"
          >
            {/* Badge — desktop only */}
            <motion.div custom={0} variants={fadeUp} className="hidden lg:inline-flex items-center gap-2 self-start mb-5">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                bg-amber-900/40 border border-amber-700/40
                text-xs font-bold uppercase tracking-widest text-amber-400">
                SEJARAH PERKEBUNAN
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              custom={0.08}
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-5"
              style={{ color: "#fef3c7" }}
            >
              Sejarah Perkebunan Kopi{" "}
              <span className="relative inline-block text-amber-400">
                Desa Tlekung
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 240 8" preserveAspectRatio="none">
                  <path d="M2 5 Q60 1 120 5 Q180 9 238 4"
                    stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              custom={0.16}
              variants={fadeUp}
              className="text-stone-400 text-sm sm:text-base leading-relaxed mb-8"
            >
              Perkebunan kopi di Desa Tlekung telah menjadi bagian penting dari kehidupan masyarakat selama puluhan tahun. Berada di lereng Gunung Arjuno, 
              kawasan ini menghasilkan kopi berkualitas sekaligus menjadi warisan yang terus dijaga dan dikembangkan dari generasi ke generasi.
</motion.p>
            {/* ── Stats cards ── */}
            <motion.div
              custom={0.22}
              variants={fadeUp}
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 mb-10"
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 p-3.5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-800/60 hover:bg-stone-800/80 transition-all duration-200"
                >
                  <span className="text-amber-600">{s.icon}</span>
                  <div>
                    <p className="text-lg font-extrabold text-amber-400 leading-none">
                      {s.value}
                      {s.unit && <span className="text-xs text-stone-500 font-semibold ml-1">{s.unit}</span>}
                    </p>
                    <p className="text-[11px] text-stone-500 mt-0.5">{s.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* ── Timeline ── */}
            <motion.div
              custom={0.28}
              variants={fadeUp}
              className="mb-8"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">
                Perjalanan Sejarah
              </p>

              <motion.ol
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={timelineVariants}
                className="relative space-y-1"
              >
                {/* Vertical line */}
                <div className="absolute left-4 top-5 bottom-5 w-px bg-stone-800" />

                {timelineItems.map((item, i) => (
                  <motion.li
                    key={i}
                    variants={timelineItem}
                    className="group relative flex gap-4 cursor-pointer"
                    onClick={() => setActiveStep(i)}
                  >
                    <TimelineDot active={activeStep === i} />

                    <div className={`flex-1 pb-5 transition-all duration-300 ${i === timelineItems.length - 1 ? "pb-0" : ""}`}>
                      {/* Year pill */}
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-1 transition-colors
                        ${activeStep === i
                          ? "bg-amber-900/50 text-amber-400"
                          : "bg-stone-900 text-stone-500 group-hover:text-amber-600/70"
                        }`}>
                        {item.year}
                      </span>

                      {/* Title */}
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-sm font-bold transition-colors duration-200
                          ${activeStep === i ? "text-amber-300" : "text-stone-400 group-hover:text-stone-300"}`}>
                          {item.title}
                        </span>
                        <span className={`text-stone-600 transition-colors ${activeStep === i ? "text-amber-700" : ""}`}>
                          {item.icon}
                        </span>
                      </div>

                      {/* Description — only active */}
                      <motion.div
                        initial={false}
                        animate={activeStep === i
                          ? { height: "auto", opacity: 1 }
                          : { height: 0, opacity: 0 }
                        }
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-stone-500 leading-relaxed pr-2 pb-2">
                          {item.desc}
                        </p>
                      </motion.div>
                    </div>
                  </motion.li>
                ))}
              </motion.ol>
            </motion.div>

            {/* CTA */}
            <motion.div custom={0.44} variants={fadeUp} className="flex flex-wrap gap-3">
              <a
                href="#varietas"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full
                  bg-amber-700 hover:bg-amber-600 text-white text-sm font-semibold
                  shadow-lg shadow-amber-900/30 hover:shadow-amber-700/30
                  hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Lihat Varietas Kopi
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
              href="#kontak"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full
                  border border-stone-700 hover:border-amber-700/60
                  text-stone-400 hover:text-amber-400 text-sm font-semibold
                  hover:bg-stone-800 transition-all duration-200"
              >
                Hubungi Kami
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-900/30 to-transparent" />
      <div
  className="
    absolute
    bottom-0
    left-0
    w-full
    h-28
    pointer-events-none
    bg-linear-to-b
    from-transparent
    to-[#05080d]
    z-10
  "
  />
<div
  className="
    absolute
    -bottom-40
    left-1/2
    -translate-x-1/2
    w-175
    h-75
    rounded-full
    bg-[#C89B3C]
    blur-[180px]
    pointer-events-none
  "
/> 
    </section>
  );
}