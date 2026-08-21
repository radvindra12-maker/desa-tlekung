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
  const router = useRouter();

  /* =========================
     VARIANTS
  ========================== */

  const variants = useMemo(
    () => product.product_variant_types?.[0]?.product_variants ?? [],
    [product]
  );

  const [selectedVariantId, setSelectedVariantId] = useState(
    variants[0]?.id
  );

  const selectedVariant = useMemo(
    () => variants.find((variant) => variant.id === selectedVariantId),
    [variants, selectedVariantId]
  );


  /* =========================
     SPECIFICATIONS
  ========================== */

  const specifications = useMemo(() => {
    return [...(product.product_specifications ?? [])].sort(
      (a, b) =>
        (a.specification_definitions?.sort_order ?? 999) -
        (b.specification_definitions?.sort_order ?? 999)
    );
  }, [product]);


  /* =========================
     ADD TO PURCHASE
  ========================== */

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

    addPurchaseItem(item);

    router.push("/purchase");
  };


  /* =========================
     PRICE
  ========================== */

  const formattedPrice =
    selectedVariant && !selectedVariant.is_price_on_request
      ? new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(selectedVariant.price ?? 0)
      : null;


  return (
    <div>

      {/* =========================
          VARIANT
      ========================== */}

      <div>

        <div className="flex items-end justify-between gap-4">

          <div>
            <p className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-stone-500
            ">
              Format
            </p>

            <h2 className="
              mt-2
              text-xl
              font-semibold
              text-[var(--coffee)]
            ">
              Pilih ukuran
            </h2>
          </div>

          {selectedVariant && (
            <span className="
              text-xs
              text-stone-500
            ">
              {selectedVariant.weight_value}
              {selectedVariant.weight_unit}
            </span>
          )}

        </div>


        {/* Variant selector */}

        <div className="
          mt-5
          grid
          grid-cols-2
          gap-3
          sm:grid-cols-3
        ">

          {variants.map((variant) => {
            const isSelected =
              selectedVariantId === variant.id;

            return (
              <button
                key={variant.id}
                type="button"
                onClick={() => setSelectedVariantId(variant.id)}
                className={`
                  group
                  relative
                  rounded-2xl
                  border
                  px-5
                  py-5
                  text-left
                  transition-all
                  duration-300

                  ${
                    isSelected
                      ? `
                        border-emerald-700
                        bg-emerald-900
                        text-white
                        shadow-lg
                        shadow-emerald-900/10
                      `
                      : `
                        border-stone-300
                        bg-white/70
                        text-[var(--coffee)]
                        hover:border-emerald-500
                        hover:bg-white
                      `
                  }
                `}
              >

                {/* Selected indicator */}
                <span
                  className={`
                    absolute
                    right-4
                    top-4
                    h-2
                    w-2
                    rounded-full
                    transition
                    ${
                      isSelected
                        ? "bg-emerald-300"
                        : "bg-stone-300 group-hover:bg-emerald-400"
                    }
                  `}
                />

                <span className="
                  block
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  opacity-70
                ">
                  Size
                </span>

                <span className="
                  mt-2
                  block
                  text-xl
                  font-semibold
                ">
                  {variant.weight_value}
                  {variant.weight_unit}
                </span>

              </button>
            );
          })}

        </div>

      </div>


      {/* =========================
          PRICE
      ========================== */}

      <div className="
        mt-8
        rounded-2xl
        border
        border-stone-200
        bg-white/50
        px-5
        py-5
      ">

        <p className="
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.22em]
          text-stone-500
        ">
          Harga
        </p>

        {selectedVariant?.is_price_on_request ? (
          <div className="mt-2">

            <p className="
              text-2xl
              font-bold
              text-[var(--coffee)]
            ">
              Harga berdasarkan permintaan
            </p>

            <p className="
              mt-1
              text-sm
              leading-6
              text-stone-500
            ">
              Harga akan dikonfirmasi pada proses pengajuan pembelian.
            </p>

          </div>
        ) : (
          <p className="
            mt-2
            text-3xl
            font-bold
            tracking-tight
            text-emerald-800
          ">
            {formattedPrice}
          </p>
        )}

      </div>


      {/* =========================
          CTA
      ========================== */}

      <Button
        type="button"
        onClick={handleAddToPurchase}
        disabled={!selectedVariant}
        className="
          mt-5
          h-14
          w-full
          rounded-2xl
          bg-emerald-800
          text-sm
          font-semibold
          uppercase
          tracking-[0.12em]
          text-white
          shadow-lg
          shadow-emerald-900/15
          transition-all
          duration-300
          hover:bg-emerald-900
          hover:shadow-xl
          hover:shadow-emerald-900/20
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        Tambah ke Permintaan
        <span className="ml-2 text-lg">
          →
        </span>
      </Button>


      {/* Small reassurance */}

      <p className="
        mt-3
        text-center
        text-xs
        leading-5
        text-stone-500
      ">
        Pilihan produk akan ditambahkan ke daftar permintaan pembelian.
      </p>


      {/* =========================
          SPECIFICATIONS
      ========================== */}

      {specifications.length > 0 && (
        <div className="mt-12">

          <div className="mb-5">

            <p className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-emerald-700
            ">
              Product details
            </p>

            <h3
              className="
                mt-2
                text-2xl
                font-bold
                text-[var(--coffee)]
              "
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              Karakteristik Produk
            </h3>

          </div>

          <div className="
            overflow-hidden
            rounded-2xl
            border
            border-stone-200
            bg-white/40
          ">
            <ProductSpecificationTable
              specifications={specifications}
            />
          </div>

        </div>
      )}

    </div>
  );
}