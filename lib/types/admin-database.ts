import type { Database } from "@/lib/types/database.types";
import type { SupabaseClient } from "@supabase/supabase-js";

export type AdminUserRow = {
  user_id: string;
  created_at: string;
};

type AdminTable = {
  Row: AdminUserRow;
  Insert: {
    user_id: string;
    created_at?: string;
  };
  Update: {
    user_id?: string;
    created_at?: string;
  };
  Relationships: [];
};

export type AdminPushSubscriptionRow = {
  id: string;
  user_id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  created_at: string;
  updated_at: string;
};

type AdminPushSubscriptionTable = {
  Row: AdminPushSubscriptionRow;
  Insert: {
    id?: string;
    user_id: string;
    endpoint: string;
    p256dh: string;
    auth: string;
    created_at?: string;
    updated_at?: string;
  };
  Update: {
    id?: string;
    user_id?: string;
    endpoint?: string;
    p256dh?: string;
    auth?: string;
    created_at?: string;
    updated_at?: string;
  };
  Relationships: [];
};

export type AdminDatabase = Omit<
  Database,
  "public"
> & {
  public: Omit<Database["public"], "Tables"> & {
    Tables: Database["public"]["Tables"] & {
      admin_users: AdminTable;
      admin_push_subscriptions: AdminPushSubscriptionTable;
    };
  };
};

export type AdminSupabaseClient =
  SupabaseClient<AdminDatabase>;