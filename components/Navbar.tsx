export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-white font-bold text-xl">
            Desa Tlekung
          </h1>
        </div>

        <div className="hidden md:flex gap-8 text-white">
          <a href="#beranda">Beranda</a>
<a href="#profil">Profil</a>
<a href="#sejarah">Sejarah</a>
<a href="#potensi">Potensi</a>
<a href="#galeri">Galeri</a>
<a href="#berita">Berita</a>
<a href="#kontak">Kontak</a>
        </div>
      </div>
    </nav>
  );
}