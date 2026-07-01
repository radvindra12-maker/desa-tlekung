import ProductGallery from "./ProductGallery";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetail({ params }: Props) {
  const { slug } = await params;

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }



  return (
    <main className="relative min-h-screen overflow-hidden bg-stone-950 text-white">

<div className="absolute inset-0 overflow-hidden pointer-events-none">

<div className="absolute top-20 left-20 w-125 h-125 bg-emerald-600/10 rounded-full blur-[180px]" />

<div className="absolute bottom-0 right-20 w-112.5 h-112.5 bg-amber-500/10 rounded-full blur-[180px]" />

</div>

      <section className="max-w-7xl mx-auto px-6 py-24">

        <Link
          href="/#produk"
          className="text-emerald-400 hover:text-emerald-300"
        >
          ← Kembali ke Produk
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 mt-12">

          <ProductGallery

images={product.gallery}

nama={product.nama}

/>

          <div>

            <span className="inline-block rounded-full bg-emerald-900/40 border border-emerald-700 px-4 py-2 text-sm text-emerald-300">

              {product.proses}

            </span>

            <h1
              className="text-6xl font-bold mt-6"
              style={{
                fontFamily: "Georgia, serif",
              }}
            >
              {product.nama}
            </h1>

<div className="mt-6 flex flex-wrap items-center gap-3">

  <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-4 py-2 text-amber-300 text-sm font-medium">
    ⭐ Premium Coffee
  </span>

  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 text-emerald-300 text-sm">
    🌱 {product.proses}
  </span>

  <span className="rounded-full bg-stone-800 px-4 py-2 text-sm">
    📦 {product.berat}
  </span>

</div>

            <p className="mt-8 text-stone-400 leading-8">
              {product.deskripsi}
            </p>

<div className="mt-8">

    <p className="text-stone-500 uppercase tracking-[0.3em] text-sm">

        Harga

    </p>

    <h2 className="text-5xl font-bold text-amber-400 mt-2">

        {product.harga}

    </h2>

</div>

<div className="mt-5 flex items-center gap-3">

<div className="text-yellow-400 text-2xl">

★★★★★

</div>

<span className="text-stone-400">

Pilihan favorit pelanggan

</span>

</div>

<div className="mt-10 flex flex-wrap gap-3">

    {product.tasting.map((item) => (

        <span
            key={item}
            className="
                rounded-full
                border
                border-emerald-700/40
                bg-emerald-900/20
                px-4
                py-2
                text-sm
                text-emerald-300
            "
        >
            {item}
        </span>

    ))}

</div>

<div className="mt-14">

<h2 className="text-2xl font-bold mb-6">

Spesifikasi Produk

</h2>

<div className="rounded-3xl border border-stone-800 overflow-hidden">

<div className="grid grid-cols-2">

<div className="p-5 border-b border-stone-800 bg-stone-900">

Origin

</div>

<div className="p-5 border-b border-stone-800">

{product.origin}

</div>

<div className="p-5 border-b border-stone-800 bg-stone-900">

Roast

</div>

<div className="p-5 border-b border-stone-800">

{product.roast}

</div>

<div className="p-5 border-b border-stone-800 bg-stone-900">

Process

</div>

<div className="p-5 border-b border-stone-800">

{product.proses}

</div>

<div className="p-5 bg-stone-900">

Berat

</div>

<div className="p-5">

{product.berat}

</div>

</div>

</div>

</div>

          </div>

        </div>

{/* Story */}

<section className="mt-16">

  <h2
    className="text-3xl font-bold mb-6"
    style={{ fontFamily: "Georgia, serif" }}
  >
    Cerita Produk
  </h2>

  <p className="text-stone-400 leading-8">
    {product.story}
  </p>

</section>

{/* Cara Seduh */}

<section className="mt-16">

<h2
className="text-3xl font-bold mb-6"
style={{ fontFamily: "Georgia, serif" }}
>

Rekomendasi Penyeduhan

</h2>

<div className="flex flex-wrap gap-3">

{product.brew.map((item) => (

<span
key={item}
className="
rounded-full
bg-amber-900/20
border
border-amber-600/30
px-5
py-3
text-amber-300
"
>

☕ {item}

</span>

))}

</div>

</section>

<div className="mt-16 flex justify-center">

<a
    href={`https://wa.me/6282139108285?text=${encodeURIComponent(product.whatsapp)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="
        mt-14
        inline-flex
        items-center
        justify-center
        rounded-full
        bg-emerald-600
        hover:bg-emerald-500
        px-8
        py-4
        text-lg
        font-semibold
        transition-all
        duration-300
    "
>

Hubungi Penjual

</a>

</div>

<section className="mt-28">

<h2
className="text-4xl font-bold mb-10"
style={{ fontFamily: "Georgia, serif" }}
>

Produk Lainnya

</h2>

<div className="grid md:grid-cols-3 gap-8">

{products
.filter((p)=>p.slug!==product.slug)
.map((p)=>(

<Link
key={p.slug}
href={`/produk/${p.slug}`}
className="group rounded-3xl border border-stone-800 overflow-hidden hover:border-emerald-500 transition"
>

<div className="relative h-64">

<Image
src={p.image}
alt={p.nama}
fill
className="object-cover group-hover:scale-105 transition duration-500"
/>

</div>

<div className="p-6">

<h3 className="text-xl font-bold">

{p.nama}

</h3>

<p className="text-emerald-400 mt-3">

{p.harga}

</p>

</div>

</Link>

))}

</div>

</section>

      </section>

    </main>
  );
}