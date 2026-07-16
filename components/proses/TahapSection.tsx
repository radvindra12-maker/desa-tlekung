"use client";
import Image from "next/image";
import { motion } from "framer-motion";

type ProcessItem = {
  nomor: string;
  judul: string;
  badge: string;
  image: string;
  video?: string;
  deskripsi: string;
};

type Props = {
  title: string;
  subtitle: string;
  description: string;
  data: ProcessItem[];
};

const icons: Record<string, string> = {
  "Tanam": "",
  "Petik": "",
  "Rambang": "",
  "Pengeringan": "",
  "Penggilingan": "",
  "Seduh": "",
};

export default function TahapSection({
  title,
  subtitle,
  description,
  data,
}: Props) {
  return (
    <div className="mb-24">

      <div className="text-center mb-20">

        <span className="
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-emerald-900/30
          border
          border-emerald-700/40
          px-5
          py-2
          text-emerald-300
          text-sm
        ">

          {subtitle}

        </span>

        <h3
          className="mt-6 text-4xl font-bold text-shadow-yellow-500"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {title}
        </h3>

<p className="mt-4 text-[var(--coffee)] max-w-2xl mx-auto leading-8">
  {description}
</p>

      </div>
<div className="space-y-20">

  {data.map((item, index) => (


    <motion.div

  key={item.nomor}
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: .6 }}
  className={`
    grid
    lg:grid-cols-2
    gap-16
    items-center
    ${data.indexOf(item) % 2 === 1
      ? "lg:[&>*:first-child]:order-2"
      : ""
    }
  `}
>
   
   
      <>
  {/* FOTO */}

  <div
    className={`
      group
      relative
      overflow-hidden
      rounded-[28px]
      border
      border-stone-800
      bg-stone-900
      shadow-2xl
      shadow-black/40

      ${data.indexOf(item) % 2 === 1
        ? "lg:order-2"
        : ""
      }
    `}
  >

    <div className="relative h-[420px]">

      {item.video ? (

        <video
          src={item.video}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

      ) : (

        <Image
          src={item.image}
          alt={item.judul}
          fill
          className="
            object-cover
            transition
            duration-700
            group-hover:scale-110
          "
        />

      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"/>

      <div className="absolute top-5 right-5">

        <span className="
          rounded-full
          bg-black/60
          backdrop-blur
          px-4
          py-2
          text-sm
          text-white
        ">

          {item.badge}

        </span>

      </div>

    </div>

  </div>

  {/* KONTEN */}

  <div
    className={`
      relative

      ${data.indexOf(item) % 2 === 1
        ? "lg:order-1"
        : ""
      }
    `}
  >

    <div className="absolute -top-10 left-0 text-[140px] font-black text-emerald-500/5">

      {item.nomor}

    </div>

    <span className="
      inline-flex
      items-center
      gap-2
      rounded-full
      bg-emerald-900/30
      border
      border-emerald-700/30
      px-4
      py-2
      text-xs
      uppercase
      tracking-[0.2em]
      text-emerald-300
    ">

      {item.badge}

    </span>

   <h3 className="mt-8 flex items-center gap-4 text-4xl font-bold text-[var(--coffee)]">

  <span className="text-5xl">

    {icons[item.judul]}

  </span>

  {item.judul}

</h3>

    <p className="mt-6 text-stone-600 leading-8">

      {item.deskripsi}

    </p>

  </div>
</>


{index !== data.length - 1 && (
  <div className="flex justify-center lg:col-span-2">
    <div
      className="
        h-16
        w-px
        rounded-full
        bg-linear-to-b
        from-emerald-500/80
        via-emerald-300/50
        to-transparent
      "
    />
  </div>
)}
    
</motion.div>
    


  ))}

</div>

    </div>
    
  );
}