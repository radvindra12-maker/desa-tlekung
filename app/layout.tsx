import "./globals.css";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
export const metadata = {
  title: "Kopi Girimurti | Desa Tlekung",
  description:
    "Website resmi Kopi Girimurti Desa Tlekung, Kota Batu.",
};
