export type ProductCardData = {
  id: string;
  name: string;
  slug: string;
  scientific_name: string | null;
  short_description: string | null;
  is_featured: boolean;

  product_categories: {
    id: string;
    name: string;
    slug: string;
  } | null;

  product_variant_types: {
    id: string;
    name: string;

    product_images: {
      storage_path: string;
      alt_text: string | null;
      is_cover: boolean;
    }[];
    coverImage?: {
  storage_path: string;
  alt_text: string | null;
} | null;
  }[];
};