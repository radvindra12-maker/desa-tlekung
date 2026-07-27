import { PurchaseItem } from "@/types/purchase";

export function getPurchaseItemCount(
  items: PurchaseItem[]
) {
  return items.length;
}

export function getPurchaseTotalQuantity(
  items: PurchaseItem[]
) {
  return items.reduce(
    (total, item) => total + item.quantity,
    0
  );
}

export function hasPurchaseItems(
  items: PurchaseItem[]
) {
  return items.length > 0;
}
export function clearPurchaseItems(): void {
  localStorage.removeItem("purchase-list");
}