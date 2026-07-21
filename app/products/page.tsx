import { getProducts } from "@/lib/supabase/queries/products";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

      <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
        {JSON.stringify(products, null, 2)}
      </pre>
    </main>
  );
}