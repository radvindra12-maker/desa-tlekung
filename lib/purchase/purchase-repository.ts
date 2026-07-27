import {
  getPurchaseItems,
  updatePurchaseItemQuantity,
  removePurchaseItem,
} from "./purchase-storage";

export const purchaseRepository = {
  getItems: getPurchaseItems,

  updateQuantity: updatePurchaseItemQuantity,

  removeItem: removePurchaseItem,

};