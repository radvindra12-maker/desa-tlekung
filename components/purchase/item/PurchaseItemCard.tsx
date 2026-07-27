import type { PurchaseItem } from "@/types/purchase";
import Image from "next/image";
import PurchaseQuantitySelector from "./PurchaseQuantitySelector";
import PurchaseRemoveButton from "./PurchaseRemoveButton";
import PurchaseSummary from "../summary/PurchaseSummary";
import { getProductImageUrl } from "@/lib/utils/image";


type PurchaseItemCardProps = {
  item: PurchaseItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export default function PurchaseItemCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: PurchaseItemCardProps) {
  return (
  <div className="rounded-2xl border border-stone-200 bg-white p-6">
    <div className="flex gap-6">
     <div className="relative h-32 w-32  shrink-0 overflow-hidden rounded-xl bg-stone-100">
  <Image
    src={getProductImageUrl(item.thumbnail)}
    alt={item.productName}
    fill
    className="object-cover"
  />
</div>

      <div className="flex-1">
        <h3 className="text-xl font-semibold">
          {item.productName}
        </h3>

        <p className="mt-1 text-stone-500">
          {item.variantName}
        </p>

        <p className="mt-4 text-xl font-bold text-amber-700">
          {item.priceOnRequest || item.price === null
            ? "Harga berdasarkan permintaan"
            : `Rp ${item.price.toLocaleString("id-ID")}`}
        </p>

<div className="mt-6">
  <PurchaseQuantitySelector
    quantity={item.quantity}
    onIncrease={onIncrease}
    onDecrease={onDecrease}
  />
</div>

<div className="mt-5">
  <p className="text-sm text-stone-500">
    Estimasi Subtotal
  </p>

  <p className="text-lg font-semibold text-stone-900">
    {item.priceOnRequest || item.price === null
      ? "-"
      : `Rp ${(item.price * item.quantity).toLocaleString("id-ID")}`}
  </p>
</div>

<div className="mt-6">
  <PurchaseRemoveButton
    onRemove={onRemove}
  />
</div>

      </div>
    </div>
  </div>

);
}