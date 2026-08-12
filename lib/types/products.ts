export type ProductVariant = {
  id: string;
  sku: string | null;
  weight_value: number;
  weight_unit: string;
  minimum_order: number | null;
  price: number | null;
  is_price_on_request: boolean;
};

export type ProductImage = {
  id: string;
  storage_path: string;
  alt_text: string | null;
  caption: string | null;
  sort_order: number;
  is_cover: boolean;
};

export type ProductVariantType = {
  id: string;
  product_id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  product_variants: ProductVariant[];
  product_images: ProductImage[];
};

export type ProductSpecificationDefinition = {
  id: string;
  name: string;
  unit: string | null;
  sort_order: number;
};

export type ProductSpecification = {
  value: string;
  specification_definitions: ProductSpecificationDefinition | null;
};

export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  scientific_name: string | null;
  short_description: string | null;
  description: string | null;
  is_featured: boolean;

  product_categories: ProductCategory | null;

  product_specifications: ProductSpecification[];

  product_variant_types: ProductVariantType[];
};

export type ProductCardData = {
  id: string;
  name: string;
  slug: string;
  scientific_name: string | null;
  short_description: string | null;
  is_featured: boolean;

  product_categories: ProductCategory | null;

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