"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const potensi = [
{
title: "Wisata Desa",
description:
"Desa Tlekung memiliki potensi wisata alam, edukasi, dan agrowisata yang mendukung ekosistem pariwisata Kota Batu.",
stat: "5+",
statLabel: "Destinasi",
image: "/images/potensi/wisata.jpg",
link: "/wisata",
},
{
title: "Kopi Girimurti",
description:
"Warisan perkebunan kopi yang menjadi identitas sejarah sekaligus penggerak ekonomi masyarakat Desa Tlekung.",
stat: "1958",
statLabel: "Sejak",
image: "/images/potensi/kopi.jpg",
link: "/kopi-girimurti",
},
{
title: "UMKM Kreatif",
description:
"Produk lokal dan usaha masyarakat terus berkembang melalui inovasi, kolaborasi, dan pemasaran digital.",
stat: "50+",
statLabel: "Pelaku Usaha",
image: "/images/potensi/umkm.jpg",
link: "/umkm",
},
];

export default function PotensiSection() {
return (
   <section id="potensi"
      className="relative py-24 bg-stone-950 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <span className="text-emerald-400 uppercase tracking-widest text-sm font-semibold">
          Potensi Unggulan
        </span>

        <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
          Potensi Desa Tlekung
        </h2>

        <p className="text-stone-400 max-w-3xl mx-auto mt-5">
          Beragam sektor unggulan yang menjadi kekuatan pembangunan,
          identitas budaya, dan sumber penghidupan masyarakat Desa Tlekung.
        </p>
      </motion.div>

      <div className="space-y-24">
        {potensi.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div
              className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}
            >
              <div className="relative h-87.5 md:h-112.5 overflow-hidden rounded-3xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover hover:scale-105 transition duration-700" />

                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute bottom-6 left-6">
                  <div className="bg-black/40 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
                    <p className="text-3xl font-bold text-white">
                      {item.stat}
                    </p>
                    <p className="text-sm text-stone-300">
                      {item.statLabel}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-emerald-900/40 border border-emerald-700/30 text-emerald-400 text-sm">
                Potensi Desa
              </span>

              <h3 className="text-3xl md:text-4xl font-bold text-white mt-5 mb-6">
                {item.title}
              </h3>

              <p className="text-stone-400 leading-relaxed text-lg">
                {item.description}
              </p>

              <Link
  href={item.link}
  className="mt-8 inline-block px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition"
>
  Pelajari Lebih Lanjut
</Link>
            </div>
          </motion.div>
        ))}
           </div>
    </div>
  </section>
  );
}