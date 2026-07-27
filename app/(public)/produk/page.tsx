import ProductGrid from "@/components/products/ProductGrid";
import { getCatalogProducts } from "@/lib/services/products";

export default async function ProductsPage() {
  const products = await getCatalogProducts();

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-stone-900">
          Produk Kopi Girimurti
        </h1>

        <p className="mt-4 max-w-2xl text-stone-600">
          Temukan berbagai pilihan kopi unggulan dari Desa Tlekung.
        </p>
      </div>

      <ProductGrid products={products ?? []} />
    </main>
  );
}