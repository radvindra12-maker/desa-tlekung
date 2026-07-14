"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const highlights = [
  {
    icon: "☕",
    text: "Warisan Perkebunan Kopi Sejak 1958",
  },
  {
    icon: "🌿",
    text: "Ditanam di Lereng Pegunungan Tlekung",
  },
  {
    icon: "🤝",
    text: "Mendukung Ekonomi dan Petani Lokal",
  },
];

const miniStats = [
  { value: "1958", label: "Tahun Berdiri" },
  { value: "60+", label: "Tahun Warisan" },
  { value: "100+", label: "Petani Terlibat" },
];

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: d,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function AboutSection() {
  return (
    <section
      id="profil"
     className="relative overflow-hidden bg-linear-to-b from-(--bg-primary) via-(--bg-primary) to-(--coffee)"
style={
{
"--section-next-bg":"#05080d"
} as React.CSSProperties
}
>
       {/* Glow */}
  <div className="absolute -top-40 -left-10 w-125 h-125 rounded-full bg-emerald-500/5 blur-[180px]" />


      <div className="absolute -top-40 -left-10 w-125 h-125 dark:bg-emerald-950/40 rounded-full bg-emerald-500/8 blur-[220px]" />
      <div className="absolute -bottom-16 right-0 w-72 h-72 bg-orange-50 dark:bg-orange-950/20 rounded-full blur-3xl opacity-70 pointer-events-none" />

     <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Gambar */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeLeft}
            className="relative"
          >
            <div className="relative rounded-4xl overflow-hidden aspect-4/5 max-h-145 shadow-[var(--shadow)] shadow-green-900/20">
              <Image
                src="/images/kopi/kebun-pagi.jpg"
                alt="Kebun Kopi Girimurti"
                fill
                priority
                className="object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                <div className="px-4 py-2 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
                  <span className="text-xs font-semibold text-[var(--heading)]">
                    Desa Tlekung, Kota Batu
                  </span>
                </div>

                <div className="px-3 py-2 rounded-2xl bg-orange-500 text-white text-xs font-bold">
                  Sejak 1958
                </div>
              </div>
            </div>

            <div className="absolute -top-5 -right-5 bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-xl">
              <h4 className="font-bold text-[var(--coffee)]">
                Kopi Girimurti
              </h4>
              <p className="text-xs text-gray-500">
                Warisan kopi masyarakat Desa Tlekung
              </p>
            </div>

            <div className="absolute -bottom-5 -left-5 bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-xl">
              <p className="text-xs text-gray-400 mb-1">
                Ketinggian Kebun
              </p>
              <p className="text-2xl font-extrabold text-[var(--beige)]">
                ±950 mdpl
              </p>
              <p className="text-[10px] text-gray-500">
                Mendukung kualitas biji kopi
              </p>
            </div>
          </motion.div>

          {/* Konten */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeRight}
          >
            <motion.div
              custom={0}
              variants={fadeUp}
              className="inline-flex mb-4"
            >
              <span className="px-4 py-2 rounded-full bg-[var(--green)]/10 text-[var(--green)] text-xs font-bold uppercase tracking-widest">
                Tentang Kopi
              </span>
            </motion.div>

            <motion.h2
              custom={0.1}
              variants={fadeUp}
              className="text-4xl font-extrabold text-gray-900 dark:text-white/60"
            >
              Mengenal Lebih Dekat{" "}
              <span className="text-[var(--dark-green)]">
                Kopi Girimurti
              </span>
            </motion.h2>

            <motion.p
              custom={0.2}
              variants={fadeUp}
              className="text-[var(--cream)] dark:text-[var(--cream)] leading-relaxed mb-4"
            >
              Kopi Girimurti merupakan warisan perkebunan kopi yang
              telah menjadi bagian dari identitas masyarakat Desa
              Tlekung sejak tahun 1958.
            </motion.p>

            <motion.p
              custom={0.25}
              variants={fadeUp}
              className="text-gray-600 dark:text-[var(--cream)] leading-relaxed mb-8"
            >
              Ditanam di kawasan pegunungan dengan kondisi alam yang
              mendukung, Kopi Girimurti dikenal memiliki karakter rasa
              yang khas dan menjadi salah satu produk unggulan
              masyarakat setempat. Hingga saat ini kopi ini terus
              dikembangkan sebagai upaya menjaga warisan lokal dan
              mendukung perekonomian masyarakat.
            </motion.p>

            <motion.ul
              custom={0.3}
              variants={fadeUp}
              className="space-y-3 mb-10"
            >
              {highlights.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-700 dark:text-[var(--beige)]"
                >
                  <span className="text-xl">
                    {item.icon}
                  </span>
                  {item.text}
                </li>
              ))}
            </motion.ul>

            <motion.div
              custom={0.35}
              variants={fadeUp}
              className="grid grid-cols-3 gap-4 mb-10"
            >
              {miniStats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-2xl bg-gray-50 dark:bg-gray-900"
                >
                  <div className="text-2xl font-bold text-[var(--beige)]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              custom={0.4}
              variants={fadeUp}
              className="flex gap-3 flex-wrap"
            >
              <Link
                href="#sejarah"
                className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-[var(--beige)] font-semibold transition"
              >
                Sejarah Kopi
              </Link>

              <Link
                href="#galeri"
                className="px-6 py-3 rounded-full border border-emerald-600 hover:bg-emerald-500 text-[var(--beige)] hover:bg-emerald-50 font-semibold transition"
              >
                Lihat Galeri
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

