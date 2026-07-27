import ProductGallery from "./ProductGallery";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
console.log(
  JSON.stringify(product, null, 2)
);

  if (!product) {
    notFound();
  }


  return (
    <main className="min-h-screen bg-[var(--cream)]">
    <section className="max-w-7xl mx-auto px-6 py-24">

      <Link
        href="/#produk"
        className="text-emerald-600 hover:text-emerald-400"
      >
        ← Kembali ke Produk
      </Link>

      <div className="mt-12">

        {product.product_variant_types?.[0]?.product_images?.length ? (
          <ProductGallery
            images={product.product_variant_types[0].product_images}
            nama={product.name}
          />
        ) : null}

        <h1 className="text-5xl font-bold mt-10">
          {product.name}
        </h1>

       <ProductDetailClient 
       product={product}/>


        {product.scientific_name && (
          <p className="italic text-stone-500 mt-2">
            {product.scientific_name}
          </p>
        )}

        <p className="mt-8 text-stone-600 leading-8">
          {product.description}
        </p>



      </div>

    </section>
  </main>

  );
}