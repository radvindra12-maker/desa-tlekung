import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/types/database.types";

export const supabaseBrowser = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);