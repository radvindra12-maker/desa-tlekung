import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { news } from "@/data/news";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function NewsDetail({ params }: Props) {
  const { slug } = await params;

  const article = news.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-950 text-white">
      <section className="max-w-5xl mx-auto px-6 py-24">
        <Link
          href="/#berita"
          className="text-emerald-400 hover:text-emerald-300"
        >
          ← Kembali ke Berita
        </Link>

        <div className="relative overflow-hidden rounded-4xl">

    <Image
        src={article.thumbnail}
        alt={article.judul}
        width={1200}
        height={700}
        className="w-full h-137.5 object-cover"
    />

    <div
        className="
        absolute
        inset-0
        bg-linear-to-t
        from-black/80
        via-black/20
        to-transparent
        "
    />

</div>

          <div className="mt-10">
            <span className="text-emerald-400">
              {article.kategori}
            </span>

            <h1
              className="text-5xl font-bold mt-5"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {article.judul}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mt-6 text-stone-400">

 <div className="h-px bg-stone-800 my-10" />
  <div>
    👤 {article.penulis}
  </div>

  <div>
    📅 {article.tanggal} {article.bulan} {article.tahun}
  </div>

  <div>
    ⏱️ {article.readTime} menit baca
  </div>

</div>
            <article
className="
mt-10
text-lg
leading-loose
whitespace-pre-line
text-stone-300
"
>
              {article.isi}
            </article>

<div
className="
mt-14
rounded-3xl
border
border-emerald-700/30
bg-emerald-900/20
p-8
"
>

<p className="italic text-xl leading-9">

Kopi bukan sekadar hasil pertanian, tetapi warisan budaya dan identitas masyarakat Desa Tlekung.

</p>

</div>

          </div>

        <section className="mt-24">

  <h2
    className="text-4xl font-bold mb-10"
    style={{ fontFamily: "Georgia, serif" }}
  >
    Berita Lainnya
  </h2>

  <div className="grid md:grid-cols-3 gap-8">

    {news
      .filter((n) => n.slug !== article.slug)
      .slice(0, 3)
      .map((item) => (

        <Link
          key={item.slug}
          href={`/berita/${item.slug}`}
          className="
            group
            overflow-hidden
            rounded-3xl
            border
            border-stone-800
            hover:border-emerald-500
            transition-all
            duration-300
          "
        >

          <div className="relative h-56 overflow-hidden">

            <Image
              src={item.thumbnail}
              alt={item.judul}
              fill
              className="
                object-cover
                group-hover:scale-105
                transition
                duration-500
              "
            />

          </div>

          <div className="p-6">

            <span className="text-sm text-emerald-400">

              {item.kategori}

            </span>

            <h3 className="mt-3 text-xl font-bold leading-8">

              {item.judul}

            </h3>

            <p className="mt-4 text-stone-400 text-sm line-clamp-3">

              {item.ringkasan}

            </p>

            <div className="mt-6 text-emerald-400 font-semibold">

              Baca Selengkapnya →

            </div>

          </div>

        </Link>

      ))}

  </div>

</section>

<section
className="
mt-24
rounded-[40px]
border
border-emerald-800/30
bg-linear-to-br
from-emerald-950/50
to-stone-900
p-12
text-center
"
>

<h2
className="text-4xl font-bold"
style={{ fontFamily: "Georgia, serif" }}
>

Tertarik Mengenal Kopi Girimurti?

</h2>

<p className="mt-6 text-stone-400 max-w-2xl mx-auto leading-8">

Pelajari proses budidaya, pengolahan,
serta produk kopi unggulan Desa Tlekung
langsung dari para petani lokal.

</p>

<div className="mt-10 flex justify-center gap-5">

<Link
href="/#produk"
className="
rounded-full
bg-emerald-600
hover:bg-emerald-500
px-8
py-4
font-semibold
transition
"
>

Lihat Produk

</Link>

<Link
href="/#kontak"
className="
rounded-full
border
border-stone-700
px-8
py-4
hover:border-emerald-500
transition
"
>

Hubungi Kami

</Link>

</div>

</section>

      </section>
    </main>

  );
}