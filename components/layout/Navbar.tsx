"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#profil" },
  { label: "Sejarah", href: "#sejarah" },
  { label: "Varietas", href: "#varietas" },
  { label: "Proses", href: "#proses" },
  { label: "Produk", href: "#produk" },
  { label: "Galeri", href: "#galeri" },
  { label: "Berita", href: "#berita" },
  { label: "Kontak", href: "#kontak" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}
         <a
  href="#beranda"
  className="flex items-center gap-3"
>
  <img
    src="/images/logo/logo-girimurti.png"
    alt="Logo Girimurti"
    className="w-15 h-15 object-contain"
  />

  <div className="hidden sm:block">

    <p className="text-white font-bold text-lg leading-none">
      Giri Murti
    </p>

    <p className="text-amber-400 text-[11px] tracking-[0.25em] uppercase">
      Coffee
    </p>

  </div>

</a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">

            {navLinks.map((link) => (

              <a
                key={link.href}
                href={link.href}
                className="
                  text-white/90
                  hover:text-emerald-400
                  transition-all
                  duration-300
                  font-medium
                "
              >
                {link.label}
              </a>

            ))}

          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >

            {isOpen ? <X size={30} /> : <Menu size={30} />}

          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>

        {isOpen && (

          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.25 }}
            className="
              md:hidden
              bg-black/95
              backdrop-blur-xl
              border-t
              border-white/10
            "
          >

            <div className="flex flex-col py-4">

              {navLinks.map((link, index) => (

                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="
                    px-6
                    py-4
                    text-white
                    hover:bg-emerald-500/10
                    hover:text-emerald-400
                    transition
                  "
                >
                  {link.label}
                </motion.a>

              ))}

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </nav>
  );
}