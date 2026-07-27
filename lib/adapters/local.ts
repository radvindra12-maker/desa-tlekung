import {
  getPurchaseItems,
  updatePurchaseItemQuantity,
  removePurchaseItem,
} from "@/lib/purchase/purchase-storage";

export const localPurchaseStorage = {
  getItems: getPurchaseItems,
  updateQuantity: updatePurchaseItemQuantity,
  removeItem: removePurchaseItem,
};