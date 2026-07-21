"use client";

{/* <GallerySection /> */}

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  kategori: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "/images/galeri/foto-1.jpg",
    title: "Kebun Kopi",
    kategori: "Kebun",
  },
  {
    id: 2,
    src: "/images/galeri/foto-2.jpg",
    title: "Panen Cherry",
    kategori: "Produk",
  },
  {
    id: 3,
    src: "/images/galeri/foto-3.jpg",
    title: "Penjemuran",
    kategori: "Produksi",
  },
  {
    id: 4,
    src: "/images/galeri/foto-4.jpg",
    title: "Roasting",
    kategori: "Produksi",
  },
  {
    id: 5,
    src: "/images/galeri/foto-5.jpg",
    title: "Produk Girimurti",
    kategori: "Produk",
  },
  {
    id: 6,
    src: "/images/galeri/foto-6.jpg",
    title: "Kebun Arjuno",
    kategori: "Kebun",
  },
];

const kategoriColor: Record<string, string> = {
  Kebun: "bg-emerald-700/80",
  Produk: "bg-violet-700/80",
  Produksi: "bg-amber-700/80",
};

function GalleryCard({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-3xl bg-stone-900 shadow-xl"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">

        <Image
          src={item.src}
          alt={item.title}
          loading="lazy"
          sizes="(max-width:768px) 100vw,
(max-width:1200px) 50vw,
33vw"
quality={85}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute top-4 left-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${kategoriColor[item.kategori]}`}
          >
            {item.kategori}
          </span>
        </div>

        <div className="absolute bottom-5 left-5">

          <h3 className="font-bold text-white text-lg">

            {item.title}

          </h3>

        </div>

      </div>
    </motion.button>
  );
}

function Lightbox({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  useEffect(() => {
  document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="
          fixed
          inset-0
          overflow-hidden
          z-[9999]
          bg-black/90
          backdrop-blur-sm
          flex
          items-center
          justify-center
          p-6
        "
      >
        <motion.div
          initial={{ scale: 0.92 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.92 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl"
        >
          <div
  className="
    relative
    w-full
    h-[85vh]
"
>
            <Image
              src={item.src}
              alt={item.title}
              loading="lazy"
              sizes="(max-width:768px) 100vw,
(max-width:1200px) 50vw,
33vw"
quality={85}
              fill
              className="object-contain"
            />

          </div>

          <button
  onClick={onClose}
  className="
    absolute
    top-4
    right-4
    z-50
    w-12
    h-12
    rounded-full
    bg-black/70
    backdrop-blur
    text-white
    text-2xl
    hover:bg-black
    transition
  "
>
  ×
</button>
          
        </motion.div>
      </motion.div>
  
  );
}

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <section
      id="galeri"
      className="relative overflow-hidden bg-linear-to-b from-(--cream) via-(--beige) to-(--beige)"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-175 rounded-full bg-emerald-900/10 blur-[180px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .5 }}
          className="text-center mb-16"
        >
          <span className="text-emerald-400 uppercase tracking-[0.3em] text-sm font-semibold">
            Dokumentasi
          </span>

          <h2
            className="mt-4 text-5xl font-bold"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Galeri Kopi Girimurti
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-stone-400 leading-8">
            Dokumentasi perjalanan Kopi Girimurti mulai dari kebun,
            panen, pengolahan, hingga menjadi kopi berkualitas.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {galleryItems.map((item) => (

            <GalleryCard
              key={item.id}
              item={item}
              onClick={() => setSelectedImage(item)}
            />

          ))}

        </div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>

        {selectedImage && (

          <Lightbox
            item={selectedImage}
            onClose={() => setSelectedImage(null)}
          />

        )}

      </AnimatePresence>

    </section>
  );
}