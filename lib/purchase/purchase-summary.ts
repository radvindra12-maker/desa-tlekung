

import type { PurchaseItem } from "@/types/purchase";

export function getPurchaseSummary(items: PurchaseItem[]) {
  const productCount = items.length;

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const estimatedTotal = items.reduce((total, item) => {
    if (item.price === null) {
      return total;
    }

    return total + item.price * item.quantity;
  }, 0);

  const hasPriceOnRequest = items.some(
    (item) => item.priceOnRequest
  );

  return {
    productCount,
    totalQuantity,
    estimatedTotal,
    hasPriceOnRequest,
  };
}