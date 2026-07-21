"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const paketWisata = [
  {
    title: "Coffee Farm Tour",
    image: "/images/program/farm-tour.jpg",
    duration: "±2 Jam",
    price: "Mulai Rp50.000",
    badge: "Paling Populer",
    icon: "",
    description:
      "Menjelajahi kebun kopi, mengenal varietas kopi, serta belajar budidaya langsung dari petani.",
  },
  {
    title: "Coffee Experience",
    image: "/images/program/brewing.jpg",
    duration: "±3 Jam",
    price: "Mulai Rp75.000",
    badge: "Best Experience",
    icon: "",
    description:
      "Belajar proses roasting, grinding, hingga menyeduh kopi menggunakan berbagai metode manual brew.",
  },
  {
    title: "Sunrise Coffee Trip",
    image: "/images/program/sunrise.jpg",
    duration: "Half Day",
    price: "Mulai Rp120.000",
    badge: "Limited",
    icon: "",
    description:
      "Menikmati sunrise di lereng pegunungan sambil menikmati secangkir Kopi Girimurti.",
  },
];

const events = [
  {
    date: "12",
    month: "AGU",
    title: "Coffee Festival",
    type: "Festival",
    status: "OPEN",
    color: "bg-emerald-500",
    description:
      "Festival kopi tahunan yang menghadirkan UMKM, bazar, lomba seduh kopi, serta pertunjukan seni budaya.",
  },
  {
    date: "24",
    month: "AGU",
    title: "Workshop Brewing",
    type: "Workshop",
    status: "LIMITED",
    color: "bg-amber-500",
    description:
      "Belajar teknik manual brew langsung bersama praktisi kopi lokal.",
  },
  {
    date: "31",
    month: "AGU",
    title: "Live Acoustic Coffee Night",
    type: "Music",
    status: "FREE",
    color: "bg-sky-500",
    description:
      "Menikmati kopi Girimurti ditemani live acoustic di Pendopo Kopi.",
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

<div className="grid lg:grid-cols-3 gap-8">

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

    <div className="relative h-64 overflow-hidden">

  <Image
    src={item.image}
    alt={item.title}
    loading="lazy"
    sizes="(max-width:768px) 100vw,
(max-width:1200px) 50vw,
33vw"
quality={85}
    fill
    className="
      object-cover
      transition-transform
      duration-700
      group-hover:scale-125
      group-hover:rotate-1
    "
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

  {/* Badge */}
  <div
    className="
      absolute
      top-5
      left-5
      rounded-full
      bg-amber-500
      px-4
      py-2
      text-xs
      font-semibold
      text-white
      shadow-lg
    "
  >
    {item.badge}
  </div>

</div>

<div className="p-7">

  <h3 className="text-2xl font-bold text-white mb-4">
    {item.icon} {item.title}
  </h3>

  <p className="text-white/75 leading-7 mb-6">
    {item.description}
  </p>

  <div className="flex items-center justify-between mb-6">

    <div>
      <p className="text-xs uppercase tracking-widest text-amber-300">
        Durasi
      </p>

      <p className="text-white font-semibold">
        {item.duration}
      </p>
    </div>

    <div className="text-right">

      <p className="text-xs uppercase tracking-widest text-amber-300">
        Harga
      </p>

      <p className="text-white font-semibold">
        {item.price}
      </p>

    </div>

  </div>

  <Link
  href={`/program/${item.title
    .toLowerCase()
    .replace(/\s+/g, "-")}`}
  className="
    block
    w-full
    rounded-full
    bg-emerald-600
    py-3
    text-center
    font-semibold
    text-white
    transition
    hover:bg-emerald-500
  "
>
  Lihat Detail →
</Link>

</div>

  </motion.div>

))}

</div>
  
{/* ================= EVENT ================= */}

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: .8 }}
  className="my-28"
>

  <div className="text-center mb-20">

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

      🎉 EVENT GIRI MURTI

    </span>

    <h2
      className="mt-8 text-5xl font-bold text-white"
      style={{ fontFamily: "Georgia, serif" }}
    >

      Upcoming
      <span className="text-amber-300">
        {" "}Events
      </span>

    </h2>

    <p className="mt-6 text-lg text-white/70 max-w-3xl mx-auto">

      Jangan lewatkan berbagai festival kopi,
      workshop,
      dan kegiatan menarik lainnya di Girimurti.

    </p>

  </div>

  <div className="max-w-4xl mx-auto">

    {events.map((event, index) => (

      <motion.div
        key={index}
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: index * .15,
          duration: .6,
        }}
        className="flex gap-8 mb-12"
      >

        {/* Timeline */}

        <div className="flex flex-col items-center">

          <div
            className={`
              w-5
              h-5
              rounded-full
              ${event.color}
            `}
          />

          {index !== events.length - 1 && (

            <div className="w-[2px] flex-1 bg-white/20 mt-2"/>

          )}

        </div>

        {/* Card */}

        <div
          className="
            flex-1
            rounded-[30px]
            border
            border-white/10
            bg-white/10
            backdrop-blur-xl
            p-8
            transition
            duration-300
            hover:bg-white/15
          "
        >

          <div className="flex justify-between items-start">

            <div>

              <p className="text-sm tracking-[0.3em] text-amber-300">

                {event.date} {event.month}

              </p>

              <h3 className="mt-2 text-3xl font-bold text-white">

                {event.title}

              </h3>

              <p className="mt-1 text-sm text-amber-200">

                {event.type}

              </p>

            </div>

            <span
              className={`
                ${event.color}
                rounded-full
                px-4
                py-2
                text-xs
                font-semibold
                text-white
              `}
            >

              {event.status}

            </span>

          </div>

          <p className="mt-6 text-white/70 leading-8">

            {event.description}

          </p>

        </div>

      </motion.div>

    ))}

  </div>

</motion.div>

</div>

<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="mt-32"
>

  <div
    className="
      relative
      overflow-hidden
      rounded-[28px]
      border
      border-white/10
      hover:border-amber-300/40
      shadow-[0_25px_60px_rgba(0,0,0,.25)]
      transition-all
      duration-300
    "
  >

    <Image
      src="/images/program/reservasi.jpg"
      alt="Reservasi Kopi Girimurti"
      loading="lazy"
      sizes="(max-width:768px) 100vw,
(max-width:1200px) 50vw,
33vw"
quality={85}
      fill
      className="object-cover"
    />

    {/* Overlay */}

    <div className="absolute inset-0 bg-black/55" />

    <div className="relative z-10 px-10 py-20 text-center">

      <span
        className="
          inline-flex
          rounded-full
          border
          border-amber-300/30
          bg-white/10
          px-5
          py-2
          text-xs
          tracking-[0.3em]
          text-amber-200
        "
      >

        ☕ BOOK YOUR EXPERIENCE

      </span>

      <h2
        className="mt-8 text-5xl font-bold text-white"
        style={{
          fontFamily: "Georgia, serif",
        }}
      >

        Siap Menjelajahi
        <span className="text-amber-300">

          {" "}Giri Murti?

        </span>

      </h2>

      <p className="max-w-3xl mx-auto mt-8 text-lg leading-8 text-white/80">

        Reservasikan kunjunganmu sekarang untuk menikmati
        pengalaman wisata edukasi kopi, workshop,
        hingga berbagai event menarik di Dusun Gangsiran Putuk.

      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">

       <a
  href="https://wa.me/6281234292878?text=Halo,%20saya%20ingin%20reservasi%20wisata%20Kopi%20Girimurti."
  target="_blank"
  rel="noopener noreferrer"
  className="
    rounded-full
    bg-emerald-600
    px-8
    py-4
    font-semibold
    text-white
    transition
    hover:bg-emerald-500
  "
>
  Reservasi Sekarang
</a>

        <a
  href="https://wa.me/6281234292878s"
  target="_blank"
  rel="noopener noreferrer"
  className="
    rounded-full
    border
    border-white/20
    bg-white/10
    px-8
    py-4
    font-semibold
    text-white
    backdrop-blur
  "
>
  Hubungi Admin
</a>

      </div>

    </div>

  </div>

</motion.div>

  

 

 

      
    </section>
  );
}