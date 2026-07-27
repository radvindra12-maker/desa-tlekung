import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="id" className={cn("font-sans", inter.variable)}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
export const metadata: Metadata = {
  title: "Pendopo Giri Murti | Gangsiran Putuk",
  description:
    "Website resmi Kopi Girimurti Desa Tlekung, Kota Batu.",
};
