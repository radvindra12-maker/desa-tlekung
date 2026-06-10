import FadeIn from "./FadeIn";
export default function PotensiSection() {
  const potensi = [
    {
      title: "Wisata",
      desc: "Destinasi wisata dan edukasi yang mendukung pariwisata Kota Batu.",
      icon: "🌄",
    },
    {
      title: "UMKM",
      desc: "Produk lokal dan usaha masyarakat yang terus berkembang.",
      icon: "🏪",
    },
    {
      title: "Pertanian",
      desc: "Komoditas unggulan yang menjadi kekuatan ekonomi desa.",
      icon: "🌾",
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          Potensi Desa
        </h2>

        <p className="text-center text-white/80 mb-12">
          Potensi unggulan Desa Tlekung yang menjadi penggerak pembangunan.
        </p>

        
  <FadeIn>
  <div className="grid md:grid-cols-3 gap-8">
          {potensi.map((item) => (
            <div
              key={item.title}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 hover:scale-105 transition"
            >
              <div className="text-5xl mb-4">{item.icon}</div>

              <h3 className="text-2xl font-semibold mb-3">
                {item.title}
              </h3>

              <p className="text-white/80">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        </FadeIn>
      </div>
    </section>
       );
    }