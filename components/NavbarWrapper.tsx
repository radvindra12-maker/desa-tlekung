"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  if (pathname.startsWith("/program/")) {
    return null;
  }

  return <Navbar />;
}