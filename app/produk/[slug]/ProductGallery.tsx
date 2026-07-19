"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  images: string[];
  nama: string;

};

export default function ProductGallery({
  
  images,
  nama,
  
}: Props) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isOpen, setIsOpen] = useState(false);
  const isSelectedVideo = selectedImage.endsWith(".mp4");

  return (
    <>
      {/* Gambar Besar */}
      <div
        onClick={() => setIsOpen(true)}
        className="
          relative
          h-162.5
          overflow-hidden
          rounded-4xl
          border
          border-stone-700
          cursor-zoom-in
          group
        "
      >
        {isSelectedVideo ? (

  <video
    src={selectedImage}
    controls
    autoPlay
    muted
    loop
    playsInline
    className="
      h-full
      w-full
      object-cover
    "
  />

) : (

  <Image
    src={selectedImage}
    alt={nama}
    sizes="(max-width:768px) 100vw,
(max-width:1200px) 50vw,
33vw"
quality={85}
    fill
    priority
    className="
      object-cover
      transition-transform
      duration-700
      group-hover:scale-105
    "
  />

)}

        <div
          className="
            absolute
            inset-0
            bg-black/25
            opacity-0
            group-hover:opacity-100
            transition
            duration-300
            flex
            items-center
            justify-center
          "
        >
          <span
            className="
              rounded-full
              bg-black/70
              px-5
              py-2
              text-white
              text-sm
            "
          >
            🔍 Klik untuk memperbesar
          </span>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="grid grid-cols-4 gap-4 mt-5">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`
              relative
              aspect-square
              overflow-hidden
              rounded-2xl
              border-2
              transition-all
              duration-300
              ${
                selectedImage === img
                  ? "border-emerald-500 ring-2 ring-emerald-400"
                  : "border-stone-700 hover:border-stone-500"
              }
            `}
          >
            {img.endsWith(".mp4") ? (

  <video
    src={img}
    muted
    playsInline
    className="
      h-full
      w-full
      object-cover
    "
  />

) : (

  <Image
    src={img}
    alt={`${nama} ${index + 1}`}
    sizes="(max-width:768px) 100vw,
(max-width:1200px) 50vw,
33vw"
quality={85}
    fill
    className="
      object-cover
      transition-transform
      duration-500
      hover:scale-110
    "
  />

)}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            className="
              fixed
              inset-0
              z-999
              bg-black/90
              flex
              items-center
              justify-center
              p-8
            "
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="
                relative
                w-full
                max-w-6xl
                h-[80vh]
              "
            >
              {isSelectedVideo ? (

  <video
    src={selectedImage}
    controls
    autoPlay
    className="
      h-full
      w-full
      object-contain
    "
  />

) : (

  <Image
    src={selectedImage}
    alt={nama}
    sizes="(max-width:768px) 100vw,
(max-width:1200px) 50vw,
33vw"
quality={85}
    fill
    className="object-contain"
  />

)}

              <button
                onClick={() => setIsOpen(false)}
                className="
                  absolute
                  top-4
                  right-4
                  w-12
                  h-12
                  rounded-full
                  bg-white
                  text-black
                  text-xl
                  font-bold
                  hover:scale-110
                  transition
                "
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}