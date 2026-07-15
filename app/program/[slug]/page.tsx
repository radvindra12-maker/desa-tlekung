import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  Trees,
  Coffee,
  Camera,
  GraduationCap,
  Cookie,
  Users,
} from "lucide-react";

import { programData } from "@/data/programData";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProgramDetail({ params }: Props) {

  const { slug } = await params;

  console.log(slug);

  const program = programData[
    slug as keyof typeof programData
  ];
    
  const featureIcons: Record<string, React.ReactNode> = {
  "Tour Kebun": <Trees size={34} />,
  "Petik Kopi": <Trees size={34} />,
  "Edukasi Petani": <GraduationCap size={34} />,
  "Coffee Break": <Coffee size={34} />,
  "Dokumentasi": <Camera size={34} />,

  "Roasting": <Coffee size={34} />,
  "Manual Brew": <Coffee size={34} />,
  "Coffee Tasting": <Coffee size={34} />,
  "Sertifikat": <GraduationCap size={34} />,
  "Snack": <Cookie size={34} />,

  "Sunrise": <Trees size={34} />,
  "Breakfast": <Cookie size={34} />,
  "Coffee Session": <Coffee size={34} />,
  "Guide": <Users size={34} />,
  "Foto Spot": <Camera size={34} />,
};

const featureDescription: Record<string, string> = {
  "Tour Kebun":
    "Menjelajahi area perkebunan kopi bersama petani lokal.",

  "Petik Kopi":
    "Belajar memanen buah kopi yang siap diproses.",

  "Coffee Break":
    "Menikmati kopi Girimurti yang baru diseduh.",

  "Dokumentasi":
    "Mengabadikan pengalaman selama kegiatan berlangsung.",

  "Edukasi Petani":
    "Belajar budidaya kopi langsung dari ahlinya.",

  "Roasting":
    "Mengenal proses sangrai biji kopi.",

  "Manual Brew":
    "Belajar teknik seduh manual.",

  "Coffee Tasting":
    "Mencicipi berbagai karakter rasa kopi.",

  "Sertifikat":
    "Sertifikat sebagai peserta kegiatan.",

  "Snack":
    "Snack dan minuman selama kegiatan.",

  "Sunrise":
    "Menikmati matahari terbit di kawasan Girimurti.",

  "Breakfast":
    "Sarapan bersama di alam terbuka.",

  "Coffee Session":
    "Sesi menikmati kopi khas Girimurti.",

  "Guide":
    "Didampingi pemandu lokal.",

  "Foto Spot":
    "Berfoto di spot terbaik kawasan wisata.",
};



 

<p className="mt-3 text-sm leading-7 text-gray-500">
 


</p>




  if (!program) {

    return (
      <main className="min-h-screen flex items-center justify-center">
1
        <h1>Program tidak ditemukan</h1>

      </main>
    );

  }

 return (
  <main className="bg-[var(--cream)]  text-[var(--text-dark)]">

    <section className="relative h-[85vh] overflow-hidden">

      <img
        src={program.image}
        alt={program.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex h-full items-center">

        <div className="mx-auto max-w-7xl px-6 w-full">

<Link
  href="/#program"
  className="
    inline-flex
    items-center
    gap-2
    rounded-full
    border
    border-white/20
    bg-white/10
    backdrop-blur-md
    px-5
    py-3
    text-white
    font-medium
    transition
    hover:bg-emerald-600
    hover:border-emerald-600
    mb-10
  "
>

  <ArrowLeft size={18} />

  Kembali ke Program

</Link>

         <div className="max-w-3xl">

  <span
    className="
      rounded-full
      bg-amber-500
      px-5
      py-2
      text-xs
      font-semibold
      tracking-[0.3em]
      text-white
    "
  >
    PROGRAM WISATA
  </span>

  <h1
    className="mt-8 text-6xl font-bold text-white"
    style={{
      fontFamily: "Georgia, serif",
    }}
  >
    {program.title}
  </h1>

  <p className="mt-5 text-2xl text-amber-300">

    {program.subtitle}

  </p>

  <p className="mt-8 text-lg leading-8 text-white/80">

    {program.description}

  </p>

</div>

<div className="mt-12 flex flex-wrap gap-8">

  <div>

    <p className="text-xs uppercase tracking-[0.25em] text-amber-300">
      Durasi
    </p>

    <p className="mt-2 text-white font-semibold">
      {program.duration}
    </p>

  </div>

  <div>

    <p className="text-xs uppercase tracking-[0.25em] text-amber-300">
      Peserta
    </p>

    <p className="mt-2 text-white font-semibold">
      {program.participants}
    </p>

  </div>

  <div>

    <p className="text-xs uppercase tracking-[0.25em] text-amber-300">
      Lokasi
    </p>

    <p className="mt-2 text-white font-semibold">
      {program.location}
    </p>

  </div>

  <div>

    <p className="text-xs uppercase tracking-[0.25em] text-amber-300">
      Harga
    </p>

    <p className="mt-2 text-white font-bold text-xl">
      {program.price}
    </p>

  </div>

</div>

<div className="mt-12 flex flex-wrap gap-4">

  <a
    href={`https://wa.me/6281234292878?text=${encodeURIComponent(
      `Halo Admin, saya ingin reservasi ${program.title}.`
    )}`}
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
    href="#detail"
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
    Lihat Detail
  </a>

</div>

        </div>

      </div>

    </section>
<section
  id="detail"
  className="py-24 bg-linear-to-b from-(--cream) via-(--beige) to-(--cream)"
>

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">

      <span
        className="
          inline-flex
          rounded-full
          bg-[var(--green)]/10
          px-5
          py-2
          text-xs
          font-semibold
          tracking-[0.3em]
          text-[var(--green)]
        "
      >

        EXPERIENCE

      </span>

      <h2
        className="mt-6 text-5xl font-bold text-[var(--coffee)]"
        style={{
          fontFamily: "Georgia, serif",
        }}
      >

        Yang Akan Kamu Dapat

      </h2>

      <p className="mt-5 text-lg text-gray-600">

        Semua paket telah dirancang agar pengunjung memperoleh
        pengalaman terbaik selama berada di Kopi Girimurti.

      </p>

     

    </div>

    

     <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">

    {program.features.map((feature) => (

<div
  key={feature}
  className="
    group
    rounded-[24px]
    bg-white
    p-8
    text-center
    shadow-lg
    transition-all
    duration-300
    hover:-translate-y-2
    hover:shadow-2xl
  "
>

 <div
  className="
    mx-auto
    mb-6
    flex
    h-18
    w-18
    items-center
    justify-center
    rounded-full
    bg-emerald-50
    text-[var(--green)]
    transition
    duration-300
    group-hover:bg-[var(--green)]
    group-hover:text-white
  "
>

  {featureIcons[feature]}

</div>

  <h3
    className="
      font-bold
      text-[var(--coffee)]
    "
  >

    {feature}

  </h3>

  <p className="mt-3 text-sm leading-7 text-gray-500">

        {featureDescription[feature]}
</p>

</div>

))}

</div>



</div>

</section>




<section className="py-24 bg-linear-to-b from-[var(--cream)] via-[var(--cream)] to-[var(--white-cream)]">

  <div className="max-w-6xl mx-auto px-6">

    <div className="text-center mb-16">

      <span
        className="
          inline-flex
          rounded-full
          bg-[var(--coffee)]/10
          px-5
          py-2
          text-xs
          font-semibold
          tracking-[0.3em]
          text-[var(--coffee)]
        "
      >
        EXPERIENCE FLOW
      </span>

      <h2
        className="mt-6 text-5xl font-bold text-[var(--coffee)]"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Itinerary Perjalanan
      </h2>

      <p className="mt-5 text-lg text-gray-600">
        Berikut alur kegiatan yang akan kamu ikuti selama program berlangsung.
      </p>

    </div>

<div className="space-y-10">

  {program.itinerary.map((item, index) => (

    <div
      key={index}
      className="
        flex
        gap-8
        items-start
      "
    >

      <div className="w-28">

        <p className="text-2xl font-bold text-[var(--green)]">

          {item.time}

        </p>

      </div>

      <div className="relative">

        <div
          className="
            w-4
            h-4
            rounded-full
            bg-[var(--green)]
          "
        />

        {index !== program.itinerary.length - 1 && (

          <div
            className="
              absolute
              left-1.5
              top-5
              w-[2px]
              h-24
              bg-[var(--green)]/20
            "
          />

        )}

      </div>

      <div className="flex-1">

        <h3 className="text-xl font-bold text-[var(--coffee)]">

          {item.title}

        </h3>

        <p className="mt-2 text-gray-600 leading-7">

          {item.description}

        </p>

      </div>

    </div>

  ))}

</div>

</div>

</section>

<section className="py-24 bg-[#EFE6D4]">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-20">

      <span
        className="
          inline-flex
          rounded-full
          bg-[var(--coffee)]/10
          px-5
          py-2
          text-xs
          font-semibold
          tracking-[0.3em]
          text-[var(--coffee)]
        "
      >

        EXPERIENCE GALLERY

      </span>

      <h2
        className="mt-6 text-5xl font-bold text-[var(--coffee)]"
        style={{
          fontFamily:"Georgia, serif"
        }}
      >

        Momen Terbaik Program

      </h2>

      <p className="mt-5 text-lg text-gray-600">

        Dokumentasi pengalaman peserta selama mengikuti
        program wisata Kopi Girimurti.

      </p>

    </div>

<div className="grid lg:grid-cols-4 gap-5 auto-rows-[220px]">

    <div className="lg:col-span-2 lg:row-span-2 relative rounded-[32px] overflow-hidden group">

  <img
    src={program.gallery[0]}
    alt=""
    className="
      w-full
      h-full
      object-cover
      transition
      duration-700
      group-hover:scale-110
    "
  />

  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"/>

</div>

{program.gallery.slice(1).map((image, index) => (

  <div
    key={index}
    className="
      relative
      overflow-hidden
      rounded-[24px]
      group
    "
  >

    <img
      src={image}
      alt=""
      className="
        w-full
        h-full
        object-cover
        transition
        duration-700
        group-hover:scale-110
      "
    />

    <div
      className="
        absolute
        inset-0
        bg-black/20
        group-hover:bg-black/5
        transition
      "
    />

  </div>

))}

</div> 


<section>

...

</section>

</div>

</section>



  </main>


);
}