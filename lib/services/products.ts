import { getProducts } from "@/lib/supabase/queries/products";
import { getCoverImages } from "@/lib/supabase/queries/product-images";
import { getProductBySlug } from "@/lib/supabase/queries/products";


export async function getProduct(slug: string) {
  return await getProductBySlug(slug);
}
export async function getCatalogProducts() {
  const [products, coverImages] = await Promise.all([
    getProducts(),
    getCoverImages(),
  ]);

  return products.map((product) => {
    const coverImage = coverImages.find(
      (image) =>
        image.product_variant_types?.product_id === product.id
    );

    return {
      ...product,
      coverImage,
    };
  });
}