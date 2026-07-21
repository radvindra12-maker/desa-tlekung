import { supabaseServer } from "../server";

export async function getProducts() {
  const { data, error } = await supabaseServer
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("name");

  if (error) throw error;

  return data;
}