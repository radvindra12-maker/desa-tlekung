"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const paketWisata = [
  {
    title: "Coffee Farm Tour",
    image: "/images/program/farm-tour.jpg",
    duration: "±2 Jam",
    price: "Mulai Rp50.000",
    badge: "Paling Populer",
    icon: "🌿",
    description:
      "Menjelajahi kebun kopi, mengenal varietas kopi, serta belajar budidaya langsung dari petani.",
  },
  {
    title: "Coffee Experience",
    image: "/images/program/brewing.jpg",
    duration: "±3 Jam",
    price: "Mulai Rp75.000",
    badge: "Best Experience",
    icon: "☕",
    description:
      "Belajar proses roasting, grinding, hingga menyeduh kopi menggunakan berbagai metode manual brew.",
  },
  {
    title: "Sunrise Coffee Trip",
    image: "/images/program/sunrise.jpg",
    duration: "Half Day",
    price: "Mulai Rp120.000",
    badge: "Limited",
    icon: "🌄",
    description:
      "Menikmati sunrise di lereng pegunungan sambil menikmati secangkir Kopi Girimurti.",
  },
];

export default function ProgramSection() {
  return (
    <section
      id="program"
      className="relative overflow-hidden py-28 bg-linear-to-b from-[var(--coffee)] via-[#7B563C] to-[var(--cream)]"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-amber-300/10 blur-[160px]" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-green-400/10 blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="text-center mb-24"
        >



  {paketWisata.map((item, index) => (

  <motion.div
    key={index}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      delay: index * 0.15,
      duration: 0.6,
    }}
    whileHover={{
      y: -10,
      scale: 1.02,
    }}
    className="
      group
      overflow-hidden
      rounded-[28px]
      border
      border-white/10
      bg-white/10
      backdrop-blur-xl
      shadow-2xl
      transition-all
      duration-300
    "
  >

    <div className="h-64 flex items-center justify-center">

      <span className="text-2xl font-bold text-white">

        {item.title}

      </span>

    </div>

  </motion.div>

))}

          <span
            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-amber-300/30
            bg-white/10
            px-5
            py-2
            text-xs
            uppercase
            tracking-[0.3em]
            text-amber-200
            "
          >

            🌿 PROGRAM GIRI MURTI

          </span>

          <h2
            className="mt-8 text-5xl md:text-6xl font-bold text-white"
            style={{
              fontFamily: "Georgia, serif",
            }}
          >

            Wisata &
            <span className="text-amber-300">
              {" "}Experience
            </span>

          </h2>

          <p className="max-w-3xl mx-auto mt-8 text-lg leading-8 text-white/75">

            Nikmati berbagai paket wisata edukasi kopi,
            pengalaman memanen kopi,
            hingga berbagai event menarik yang diselenggarakan
            di Kopi Girimurti.

          </p>

        </motion.div>

      </div>
    </section>
  );
}