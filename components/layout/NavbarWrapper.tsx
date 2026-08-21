"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Halaman yang menggunakan layout tanpa navbar utama
  const hideNavbar =
    pathname.startsWith("/program/") ||
    pathname.startsWith("/produk/") ||
    pathname === "/purchase" ||
    pathname.startsWith("/purchase/request");

  if (hideNavbar) {
    return null;
  }

  return <Navbar />;
}