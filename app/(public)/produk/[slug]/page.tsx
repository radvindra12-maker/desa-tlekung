import ProductGallery from "./ProductGallery";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct } from "@/lib/services/products";
import ProductDetailClient from "../../../../components/products/ProductDetailClient";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetail({ params }: Props) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const galleryImages =
    product.product_variant_types?.[0]?.product_images ?? [];

  return (
    <main className="min-h-screen bg-[var(--cream)]">

      {/* =========================
          HEADER / BACK
      ========================== */}

      <section className="relative overflow-hidden">

        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-emerald-700/10 blur-[120px]" />

          <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-amber-500/10 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pt-12 pb-24">

          {/* Back */}
          <Link
            href="/#produk"
            className="
              group
              inline-flex
              items-center
              gap-3
              text-sm
              font-medium
              text-stone-500
              transition-colors
              hover:text-emerald-700
            "
          >
            <span
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-stone-300
                bg-white/60
                transition
                group-hover:border-emerald-600
                group-hover:bg-emerald-50
              "
            >
              ←
            </span>

            Kembali
          </Link>


          {/* =========================
              PRODUCT HERO
          ========================== */}

          <div className="mt-12 grid items-start gap-14 lg:grid-cols-[1.08fr_0.92fr]">

            {/* =========================
                LEFT : GALLERY
            ========================== */}

            <div>

              <div className="mb-5 flex items-center gap-3">
                <span className="
                  h-px
                  w-8
                  bg-emerald-700
                " />

                <span className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-emerald-700
                ">
                  Specialty Coffee
                </span>
              </div>

              {galleryImages.length > 0 && (
                <ProductGallery
                  images={galleryImages}
                  nama={product.name}
                />
              )}

            </div>


            {/* =========================
                RIGHT : PRODUCT INFO
            ========================== */}

            <div className="lg:pt-10">

              {/* Product category */}
              <div className="
                mb-6
                flex
                flex-wrap
                items-center
                gap-3
              ">

                <span className="
                  rounded-full
                  border
                  border-emerald-700/20
                  bg-emerald-900/5
                  px-4
                  py-1.5
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-emerald-800
                ">
                  Kopi Giri Murti
                </span>

                <span className="text-stone-400">
                  ·
                </span>

                <span className="
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  text-stone-500
                ">
                  Desa Tlekung
                </span>

              </div>


              {/* Product name */}
              <h1
                className="
                  text-5xl
                  font-bold
                  leading-[1.05]
                  tracking-tight
                  text-[var(--coffee)]
                  md:text-6xl
                "
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                }}
              >
                {product.name}
              </h1>


              {/* Scientific name */}
              {product.scientific_name && (
                <p className="
                  mt-4
                  text-base
                  italic
                  text-stone-500
                ">
                  {product.scientific_name}
                </p>
              )}


              {/* Short description */}
              <p className="
                mt-7
                max-w-xl
                text-base
                leading-8
                text-stone-600
              ">
                {product.description}
              </p>


              {/* Divider */}
              <div className="
                my-9
                h-px
                w-full
                bg-stone-300/80
              " />


              {/* Purchase area */}
              <ProductDetailClient product={product} />

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}