import { supabaseServer } from "../server";
import { addPurchaseItem } from "@/lib/purchase/purchase-storage";

export async function getProducts () {
  const { data, error } = await supabaseServer
    .from("products")
   .select(`
id,
name,
slug,
scientific_name,
short_description,
is_featured,

product_categories(
    id,
    name,
    slug
),

product_variant_types(
    id,
    name,

    product_images(
        storage_path,
        alt_text,
        is_cover
    )
)
`)
    .eq("is_active", true)
    .order("name");

  if (error) {
    throw error;
  }

console.log(JSON.stringify(data, null, 2));

  return data;
}

export async function getProductBySlug(slug: string) {
  // Ambil produk
  const { data: product, error } = await supabaseServer
    .from("products")
   .select(`
      id,
      name,
      slug,
      scientific_name,
      short_description,
      description,
      is_featured,

      product_categories(
        id,
        name,
        slug
      ),

      product_specifications(
        value,

        specification_definitions(
          id,
          name,
          unit,
          sort_order
        )
      )
    `)
    .eq("slug", slug)
    .single();

  if (error || !product) {
    console.log(error);
    return null;
  }
console.log("PRODUCT ID =", product.id);
  // Ambil variant type + variants + images
  const { data: variantTypes, error: variantError } =
    await supabaseServer
      .from("product_variant_types")
    .select(`
  id,
  product_id,
  name,
  description,
  is_active,

  product_variants(
    id,
    sku,
    weight_value,
    weight_unit,
    minimum_order,
    price,
    is_price_on_request
  ),

  product_images(
    id,
    storage_path,
    alt_text,
    caption,
    sort_order,
    is_cover
  )
`)
.eq("product_id", product.id);

console.log("===== VARIANT ERROR =====");
console.log(variantError);

console.log("===== VARIANT TYPES =====");
console.log(JSON.stringify(variantTypes, null, 2));
  if (variantError) {
    console.log(variantError);
  }

  const result = {
    ...product,
    product_variant_types: variantTypes ?? [],
  };

 
console.log("===== RESULT =====");
console.dir(result, { depth: null });

  return result;
}