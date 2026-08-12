import Link from "next/link";
import { getProductImageUrl } from "@/lib/utils/image";
import type { ProductCardData } from "@/lib/types/products";
import Image from "next/image";


type ProductCardProps = {
  product: ProductCardData;
 
};



export default function ProductCard({ product }: ProductCardProps) {

  const coverImage = product.product_variant_types
  ?.flatMap((variant) => variant.product_images)
  ?.find((image) => image.is_cover);

  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* Placeholder Image */}
    <div className="relative h-56 bg-stone-100">
  {coverImage ? (
    <Image
      src={getProductImageUrl(coverImage.storage_path)}
      alt={coverImage.alt_text ?? product.name}
      fill
      className="object-cover"
    />
  ) : (
    <div className="flex h-full items-center justify-center text-stone-400">
      Foto Produk
    </div>
  )}
</div>

      <div className="space-y-3 p-6">
        {product.is_featured && (
          <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
            Unggulan
          </span>
        )}

        <div>
          <h2 className="text-xl font-bold text-stone-900">
            {product.name}
          </h2>

          {product.scientific_name && (
            <p className="italic text-stone-500">
              {product.scientific_name}
            </p>
          )}
        </div>

        {product.short_description && (
          <p className="line-clamp-3 text-sm text-stone-600">
            {product.short_description}
          </p>
        )}

        {product.product_categories && (
          <span className="inline-block rounded-md bg-stone-100 px-2 py-1 text-xs text-stone-600">
            {product.product_categories.name}
          </span>
        )}

        <Link
          href={`/produk/${product.slug}`}
          className="inline-flex rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-800"
        >
          Lihat Detail
        </Link>
      </div>
    </article>
  );
}