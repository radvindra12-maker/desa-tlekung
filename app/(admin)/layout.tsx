import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { AdminPwaProvider } from "@/components/admin-pwa/AdminPwaProvider";

/**
 * Layout KHUSUS route group (admin): /purchase-requests & /purchase-requests/[id].
 *
 * Route group tidak menambah segmen URL, jadi metadata di sini
 * (termasuk link manifest PWA) HANYA berlaku untuk dua halaman
 * tersebut — tidak bocor ke website publik maupun /login, karena
 * keduanya berada di route group lain yang tidak mewarisi file ini.
 *
 * Sengaja TIDAK memakai tag <main> di sini karena app/layout.tsx
 * (root) dan setiap page.tsx admin sudah memiliki <main> masing-masing.
 * Menambah <main> lagi di sini akan membuat nesting berlebih.
 */
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

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AdminPwaProvider>{children}</AdminPwaProvider>;
}
