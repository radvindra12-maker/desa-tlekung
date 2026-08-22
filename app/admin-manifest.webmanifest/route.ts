import { NextResponse } from "next/server";

/**
 * Manifest KHUSUS untuk PWA Dashboard Admin.
 *
 * Sengaja dibuat sebagai Route Handler (bukan memakai konvensi
 * `manifest.ts` bawaan Next.js) supaya:
 * 1. Tidak bentrok/ambigu dengan manifest lain di masa depan.
 * 2. `<link rel="manifest">` yang mengarah ke sini HANYA dipasang
 *    di app/(admin)/layout.tsx, sehingga tidak pernah muncul di
 *    website publik atau halaman /login.
 *
 * `scope` & `start_url` sengaja dikunci ke "/purchase-requests"
 * agar PWA ini murni menjadi aplikasi admin, bukan seluruh website.
 */
export function GET() {
  const manifest = {
    name: "Giri Murti Admin",
    short_name: "Giri Murti Admin",
    description:
      "Kelola permintaan pembelian Pendopo Giri Murti Coffee.",
    start_url: "/purchase-requests",
    scope: "/purchase-requests",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#0D530E",
    theme_color: "#0D530E",
    lang: "id",
    icons: [
      {
        src: "/icons/admin-icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/admin-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/admin-icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json",
    },
  });
}
