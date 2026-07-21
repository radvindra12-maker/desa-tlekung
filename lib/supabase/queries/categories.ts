import { supabaseServer } from "../server";

export async function getCategories() {
  const { data, error } = await supabaseServer
    .from("product_categories")
    .select("*")
    .order("name");

  if (error) throw error;

  return data;
}