import { supabaseServer } from "../server";

export async function getCoverImages() {
  const { data, error } = await supabaseServer
    .from("product_images")
    .select(`
      storage_path,
      alt_text,
      variant_type_id,
      product_variant_types (
        product_id
      )
    `)
    .eq("is_cover", true);

  if (error) {
    throw error;
  }

  return data;
}