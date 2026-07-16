"use client";
import Image from "next/image";
import { motion } from "framer-motion";
const varietas = [
  {
    nama: "Arabika",
    latin: "Coffea arabica",
    image: "/images/varietas/arabika.jpg",
    warna: "bg-red-500",
    deskripsi:
      "Memiliki cita rasa lembut dengan aroma yang kompleks dan tumbuh optimal di kawasan pegunungan Desa Tlekung.",
  },
  {
    nama: "Atengjanda",
    latin: "Varietas Lokal",
    image: "/images/varietas/atingjanda.jpg",
    warna: "bg-green-500",
    deskripsi:
      "Varietas kopi yang turut dibudidayakan masyarakat sebagai bagian dari keberagaman tanaman kopi di Desa Tlekung.",
  },
  {
    nama: "Gayoh Aceh",
    latin: "Varietas Lokal",
    image: "/images/varietas/gayuh.jpg",
    warna: "bg-yellow-500",
    deskripsi:
      "Dikenal memiliki produktivitas yang baik dan mampu beradaptasi dengan kondisi lahan pegunungan.",
  },
  {
    nama: "Yellow Caturra",
    latin: "Varietas Lokal",
    image: "/images/varietas/hilukatura.jpg",
    warna: "bg-stone-600",
    deskripsi:
      "Menjadi salah satu varietas yang memperkaya koleksi kopi lokal Desa Tlekung dengan karakteristik tersendiri.",
  },
];
export default function VarietasSection() {
  return (
    <section
      id="varietas"
      className="relative overflow-hidden bg-linear-to-b from-(--coffee) via-(--beige) to-(--beige)"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">

          <span className="uppercase tracking-[0.3em] text-emerald-400 text-sm font-semibold">
            VARIETAS KOPI 
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-white">
            Varietas Kopi
            <br />
            <span className="text-amber-400">
              Desa Tlekung
            </span>
          </h2>
<div className="flex justify-center mt-6 mb-8">

  <div className="absolute bottom-20 left-20 w-105 h-105 rounded-full bg-green-500/8 blur-[220px]" />
</div>
          <p className="mt-6 max-w-3xl mx-auto text-stone-200 leading-relaxed">
            Perkebunan kopi Desa Tlekung memiliki berbagai varietas kopi
            unggulan yang dibudidayakan oleh masyarakat selama bertahun-tahun.
            Setiap varietas memiliki karakteristik serta cita rasa yang
            berbeda.
          </p>

        </div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

  {varietas.map((item) => (

    <motion.div
  key={item.nama}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="group bg-stone-900/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-stone-800 shadow-xl shadow-black/30 hover:border-emerald-600 transition-all duration-300 hover:-translate-y-2"
>

     <div className="relative h-64 overflow-hidden">

        <Image
  src={item.image}
  alt={item.nama}
  fill
  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
/>
<div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      <div className="p-6">
<span className="inline-block px-3 py-1 mb-3 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-semibold">
  Varietas Unggulan
</span>

        <h3 className="text-2xl font-bold text-white mb-3">
          {item.nama}
        </h3>
<p className="text-emerald-400 text-sm italic mb-4">
  {item.latin}
</p>
        <p className="text-stone-400 text-sm leading-relaxed">
          {item.deskripsi}
        </p>
<div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">

  <div className="flex items-center gap-2">

    <div className={`w-3 h-3 rounded-full ${item.warna}`} />

    <span className="text-xs text-stone-400">
      Budidaya Desa Tlekung
    </span>

  </div>

  <span className="text-lg">
    ☕
  </span>

</div>


</div>
      

    </motion.div>

  ))}

</div>

      </div>
    </section>
  );
}