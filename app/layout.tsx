import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pendopo Giri Murti | Gangsiran Putuk",
  description:
    "Website resmi Kopi Giri Murti Desa Tlekung, Kota Batu.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="id" className={cn("font-sans")}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}