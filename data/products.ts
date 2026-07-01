export interface Product {
  slug: string;
  nama: string;
  harga: string;
  berat: string;
  roast: string;
  proses: string;
  origin: string;
  image: string;
  whatsapp: string;
  deskripsi: string;
  tasting: string[];

  story: string;
  brew: string[];
  gallery: string[];
}

export const products = [
  {
    slug: "arabica-yellow-caturra",
    nama: "Arabica Yellow Caturra",
    harga: "Rp95.000",
    berat: "200 gram",
    roast: "Medium Roast",
    proses: "Natural Process",
    origin: "Desa Tlekung, Kota Batu",
    image: "/images/produk/Arabica-YC.jpg",

    whatsapp:
      "Halo, saya ingin membeli Arabica Yellow Caturra.",

    deskripsi:
      "Arabica Yellow Caturra merupakan kopi arabika unggulan dari Desa Tlekung yang memiliki karakter rasa floral, citrus, dan manis alami.",

    tasting: [
      "Floral",
      "Citrus",
      "Brown Sugar",
      "Medium Body",
    ],
    story:
    "Dibudidayakan di kawasan lereng Desa Tlekung dengan ketinggian ideal, varietas Yellow Caturra menghasilkan karakter rasa yang lembut dengan aroma floral yang khas.",

  brew: [
    "V60",
    "French Press",
    "Espresso",
  ],

  gallery: [
    "/images/produk/Arabica-YC.jpg",
    "/images/produk/Arabica-YC.jpg",
    "/images/produk/Arabica-YC.jpg",
    "/images/produk/Arabica-YC.jpg",  
  ],
  },

  {
    slug: "arabica-gp",
    nama: "Arabica Gangsiran Puthuk",
    harga: "Rp120.000",
    berat: "200 gram",
    roast: "Light Roast",
    proses: "Natural Process",
    origin: "Desa Tlekung",
    image: "/images/produk/Arabika-GP.jpg",

    whatsapp:
      "Halo, saya ingin membeli Arabika Gangsiran Puthuk.",

    deskripsi:
      "Kopi Arabika Gangsiran Puthuk dengan aroma floral yang sangat khas dan aftertaste panjang.",

    tasting: [
      "Jasmine",
      "Tea Like",
      "Peach",
      "Honey",
    ],
    story:
"Ditanam di kawasan Gangsiran Puthuk, Desa Tlekung, kopi arabika ini tumbuh pada lingkungan pegunungan yang sejuk dengan tanah vulkanik yang subur. Proses natural dipilih untuk mempertahankan karakter floral dan sweetness alami sehingga menghasilkan secangkir kopi dengan aroma yang elegan dan aftertaste yang panjang.",

brew: [
  "V60",
  "Kalita Wave",
  "Chemex",
],

gallery: [
  "/images/produk/Arabika-GP.jpg",
  "/images/produk/Arabika-GP.jpg",
  "/images/produk/Arabika-GP.jpg",
  "/images/produk/Arabika-GP.jpg",
],
  },

  {
    slug: "robusta-honey",
    nama: "Robusta Honey",
    harga: "Rp65.000",
    berat: "200 gram",
    roast: "Medium Dark",
    proses: "Honey Process",
    origin: "Desa Tlekung",
    image: "/images/produk/Robusta-HN.jpg",

    whatsapp:
      "Halo, saya ingin membeli Robusta Honey.",

    deskripsi:
      "Robusta dengan body tebal, aroma coklat dan karakter yang kuat.",

    tasting: [
      "Dark Chocolate",
      "Caramel",
      "Nutty",
      "Bold Body",
    ],
    story:
"Robusta Honey diproses menggunakan metode Honey Process yang mempertahankan sebagian lapisan lendir buah kopi selama proses pengeringan. Teknik ini menghasilkan karakter rasa yang lebih manis, body tebal, serta aroma cokelat dan karamel yang khas, menjadikannya pilihan tepat bagi penikmat kopi dengan cita rasa kuat.",

brew: [
  "French Press",
  "Vietnam Drip",
  "Espresso",
],

gallery: [
  "/images/produk/Robusta-HN.jpg",
  "/images/produk/Robusta-HN.jpg",
  "/images/produk/Robusta-HN.jpg",
  "/images/produk/Robusta-HN.jpg",
],
  },

  {
    slug: "excelsa",
    nama: "Excelsa",
    harga: "Rp90.000",
    berat: "200 gram",
    roast: "Medium Roast",
    proses: "Natural",
    origin: "Desa Tlekung",
    image: "/images/produk/Excelsa.jpg",

    whatsapp:
      "Halo, saya ingin membeli Kopi Excelsa.",

    deskripsi:
      "Excelsa memiliki rasa unik dengan perpaduan fruity dan sedikit asam yang menyegarkan.",

    tasting: [
      "Jackfruit",
      "Winey",
      "Tropical",
      "Sweet",
    ],
    story:
"Kopi Excelsa merupakan salah satu varietas unik yang dibudidayakan oleh petani Desa Tlekung. Karakter fruity dengan sedikit keasaman memberikan pengalaman rasa yang berbeda dari arabika maupun robusta. Produksi yang terbatas menjadikan Excelsa sebagai salah satu kopi spesial yang layak dicoba.",

brew: [
  "V60",
  "Aeropress",
  "French Press",
],

gallery: [
  "/images/produk/Excelsa.jpg",
  "/images/produk/Excelsa.jpg",
  "/images/produk/Excelsa.jpg",
  "/images/produk/Excelsa.jpg",
],
  },
];