"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import EmptyState from "@/components/ui/patterns/EmptyState";

import PurchaseItemCard from "../item/PurchaseItemCard";
import PurchaseSummary from "../summary/PurchaseSummary";

import { purchaseRepository } from "@/lib/purchase/purchase-repository";

import { getPurchaseSummary } from "@/lib/purchase/purchase-summary";

import { PurchaseItem } from "@/types/purchase";

export default function PurchaseList() {
  const router = useRouter();
 const [items, setItems] = useState<PurchaseItem[]>(
  () => purchaseRepository.getItems()
);
 

const summary = useMemo(() => {
  return getPurchaseSummary(items);
}, [items]);



  const refreshItems = () => {
    setItems(purchaseRepository.getItems());
  };

  const handleIncrease = (id: string) => {
    const item = items.find((item) => item.id === id);

    if (!item) return;

    purchaseRepository.updateQuantity(id, item.quantity + 1);

    refreshItems();
  };

  const handleDecrease = (id: string) => {
    const item = items.find((item) => item.id === id);

    if (!item) return;

    purchaseRepository.updateQuantity(
      id,
      Math.max(1, item.quantity - 1)
    );

    refreshItems();
  };

  const handleRemove = (id: string) => {
   purchaseRepository.removeItem(id);

    refreshItems();
  };

  if (items.length === 0) {
  return (
    <EmptyState
      icon={<Package className="h-10 w-10 text-amber-700" />}
      title="Belum ada produk"
      description="Tambahkan produk ke daftar permintaan sebelum melanjutkan proses pembelian."
      action={
        <Button
          onClick={() => router.push("/produk")}
        >
          Jelajahi Produk
        </Button>
      }
    />
  );
}


  return (
  <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
    <div className="space-y-6">
      {items.map((item) => (
        <PurchaseItemCard
          key={item.id}
          item={item}
          onIncrease={() => handleIncrease(item.id)}
          onDecrease={() => handleDecrease(item.id)}
          onRemove={() => handleRemove(item.id)}
        />
      ))}
    </div>

    <div className="lg:sticky lg:top-24 h-fit">
      <PurchaseSummary
  productCount={summary.productCount}
  totalQuantity={summary.totalQuantity}
  estimatedTotal={summary.estimatedTotal}
   hasPriceOnRequest={summary.hasPriceOnRequest}
  footer={
    <Button
    onClick={() => router.push("/purchase/request")}
      className="w-full rounded-xl bg-amber-700 px-5 py-3 font-semibold text-white hover:bg-amber-800 transition"
    >
      Lanjutkan Permintaan
    </Button>
  }
/>
    </div>
  </div>
);
}