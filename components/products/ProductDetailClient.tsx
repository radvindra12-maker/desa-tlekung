"use client";

import { Button } from "@/components/ui/button";
import { addPurchaseItem } from "@/lib/purchase/purchase-storage";
import { useRouter } from "next/navigation";
import ProductSpecificationTable from "./ProductSpecificationTable";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types/products";

type Props = {
  product: Product;
};

export default function ProductDetailClient({ product }: Props) {
console.log("PRODUCT");
  console.log(product);

  console.log("VARIANT TYPES");
  console.log(product.product_variant_types);
  console.dir(product.product_variant_types, {
  depth: null,
});

  const variants = useMemo(
    () => product.product_variant_types?.[0]?.product_variants ?? [],
    [product] 
  );

  console.log("VARIANTS");
  console.log(variants);

const [selectedVariantId, setSelectedVariantId] = useState(
    variants[0]?.id
  );

  const selectedVariant = useMemo(
    () => variants.find((v) => v.id === selectedVariantId),
    [variants, selectedVariantId]
  );
console.log(
  JSON.stringify(selectedVariant, null, 2)
);

const specifications = useMemo(() => {
  return [...(product.product_specifications ?? [])].sort(
    (a, b) =>
      (a.specification_definitions?.sort_order ?? 999) -
      (b.specification_definitions?.sort_order ?? 999)
  );
}, [product]);

console.log("Selected Variant:", selectedVariant?.weight_value);

console.log("Product Specifications");
console.log(specifications);
  
const router = useRouter();

const handleAddToPurchase = () => {
  if (!selectedVariant) return;

  

 const coverImage =
  product.product_variant_types?.[0]?.product_images.find(
    (image) => image.is_cover
  );

      
  const item = {
    productId: product.id,
    variantId: selectedVariant.id,

    productName: product.name,

    variantName: `${selectedVariant.weight_value}${selectedVariant.weight_unit}`,

    thumbnail: coverImage?.storage_path ?? "",

    quantity: 1,

    price: selectedVariant.price,

    priceOnRequest: selectedVariant.is_price_on_request,
  };

  
console.log(item);


  addPurchaseItem(item);

  console.log(localStorage.getItem("purchase-list"));

  router.push("/purchase");
};

  return (
    <>
      {/* Variant */}
      <div className="mt-8">
        <h3 className="font-semibold mb-3">
          Pilih Varian
        </h3>

        <div className="flex gap-3 flex-wrap">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariantId(variant.id)}
              className={`px-4 py-2 rounded-lg border transition ${
                selectedVariantId === variant.id
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white hover:border-emerald-500"
              }`}
            >
              {variant.weight_value}
              {variant.weight_unit}
            </button>
          ))}
        </div>
      </div>

      {/* Harga */}
      <div className="mt-8">
        {selectedVariant?.is_price_on_request ? (
          <p className="text-3xl font-bold text-emerald-700">
            Hubungi Kami
          </p>
        ) : (
          <p className="text-3xl font-bold text-emerald-700">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(selectedVariant?.price ?? 0)}
          </p>
        )}
      </div>

<div className="mt-8">
 <Button
  onClick={handleAddToPurchase}
  className="bg-green-700 hover:bg-green-800"
>
  Tambah ke Permintaan
</Button>
</div>


{/* Spesifikasi */}
<div className="mt-10">
  <ProductSpecificationTable
    specifications={specifications}
/>
  
</div>
      
    </>
  );
}