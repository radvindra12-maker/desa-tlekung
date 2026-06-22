const navLinks = [
{ label: "Beranda", href: "#beranda" },
{ label: "Tentang", href: "#profil" },
{ label: "Sejarah", href: "#sejarah" },
{ label: "Galeri", href: "#galeri" },
{ label: "Berita", href: "#berita" },
{ label: "Kontak", href: "#kontak" },
];

export default function Navbar() {
return ( <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md"> <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"> <div> <h1 className="text-white font-bold text-xl">
Kopi Giri murti </h1> </div>

    <div className="hidden md:flex gap-8 text-white">
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="hover:text-emerald-400 transition"
        >
          {link.label}
        </a>
      ))}
    </div>
  </div>
</nav>


);
}
