import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AdminSupabaseClient } from "@/lib/types/admin-database";
import { AdminPwaProvider } from "@/components/admin-pwa/AdminPwaProvider";

export const metadata: Metadata = {
  title: "Giri Murti Admin",
  description:
    "Dashboard admin untuk mengelola permintaan pembelian Pendopo Giri Murti Coffee.",
  manifest: "/admin-manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Giri Murti Admin",
  },
  icons: {
    icon: "/icons/admin-icon-192.png",
    apple: "/icons/admin-icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D530E",
  viewportFit: "cover",
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Belum login
  if (!user) {
    redirect("/login");
  }

  const adminSupabase =
    supabase as unknown as AdminSupabaseClient;

  const {
    data: adminUser,
    error: adminError,
  } = await adminSupabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  // User login tetapi bukan admin,
  // atau terjadi error authorization.
  if (adminError || !adminUser) {
    redirect("/login");
  }

  return (
    <AdminPwaProvider>
      {children}
    </AdminPwaProvider>
  );
}