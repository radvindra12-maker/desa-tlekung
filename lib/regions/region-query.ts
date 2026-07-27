import { supabase } from "@/lib/supabase/client";
import { REGION_LEVEL } from "./region-level";

export function getProvinces() {
  return supabase
    .from("regions")
    .select("code,name")
    .eq("level", REGION_LEVEL.PROVINCE)
    .order("name");
}

export function getChildren(parentCode: string) {
  return supabase
    .from("regions")
    .select("code,name")
    .eq("parent_code", parentCode)
    .order("name");
}

export function getRegion(code: string) {
  return supabase
    .from("regions")
    .select("code, parent_code, level, name")
    .eq("code", code)
    .single();
}