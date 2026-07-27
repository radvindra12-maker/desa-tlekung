import type { ReactNode } from "react";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import { Analytics } from "@vercel/analytics/next";

export default function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <NavbarWrapper />
      <main>{children}</main>
      <Analytics />
    </>
  );
}