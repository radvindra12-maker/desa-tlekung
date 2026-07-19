import "./globals.css";
import type { ReactNode } from "react";
import NavbarWrapper from "@/components/NavbarWrapper";
import { Analytics } from "@vercel/analytics/next";


export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <NavbarWrapper />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
export const metadata = {
  title: "Pendopo Giri Murti | Gangsiran Putuk",
  description:
    "Website resmi Kopi Girimurti Desa Tlekung, Kota Batu.",
};
