import type {
  PurchaseItem,
  PurchaseItemInput,
} from "@/types/purchase";

const PURCHASE_STORAGE_KEY = "purchase-list";

export function getPurchaseItems(): PurchaseItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const data = localStorage.getItem(PURCHASE_STORAGE_KEY);

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data) as PurchaseItem[];
  } catch (error) {
    console.error("Failed to parse purchase list", error);

    localStorage.removeItem(PURCHASE_STORAGE_KEY);

    return [];
  }
}

export function savePurchaseItems(items: PurchaseItem[]): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    PURCHASE_STORAGE_KEY,
    JSON.stringify(items)
  );
}

export function addPurchaseItem(
  item: PurchaseItemInput
  )
: void {
  const items = getPurchaseItems();

  const existingItem = items.find(
  (purchaseItem) =>
    purchaseItem.productId === item.productId &&
    purchaseItem.variantId === item.variantId
);
if (existingItem) {
  const updatedItems = items.map((purchaseItem) => {

    if (
      purchaseItem.productId === item.productId &&
      purchaseItem.variantId === item.variantId
    ) {
      return {
        ...purchaseItem,
        quantity: purchaseItem.quantity + item.quantity,
      };
    }

    return purchaseItem;
  });

 savePurchaseItems(updatedItems);

  return;
}

const newItem: PurchaseItem = {
  id: crypto.randomUUID(),

  ...item,
};

items.push(newItem);

savePurchaseItems(items);

}


export function updatePurchaseItemQuantity(
  itemId: string,
  quantity: number
): void {
  const items = getPurchaseItems();

  if (quantity <= 0) {
    removePurchaseItem(itemId);
    return;
  }

  const updatedItems = items.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        quantity,
      };
    }

    return item;
  });

  savePurchaseItems(updatedItems);
}

export function removePurchaseItem(
  itemId: string
): void {
  const items = getPurchaseItems();

  const updatedItems = items.filter(
    (item) => item.id !== itemId
  );

  savePurchaseItems(updatedItems);
}


