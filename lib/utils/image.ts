import { supabaseBrowser } from "@/lib/supabase/browser";

const BUCKET = "product-images";

export function getProductImageUrl(path: string) {
  return supabaseBrowser
    .storage
    .from(BUCKET)
    .getPublicUrl(path).data.publicUrl;
}