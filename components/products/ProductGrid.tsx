import ProductCard from "./ProductCard";
import type { ProductCardData } from "@/lib/types/product";

type Props = {
  products: ProductCardData[];
};

export default function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center text-stone-500">
        Belum ada produk.
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard 
          key={product.id}
          product={product}
      />
))}
    </div>
  );
}