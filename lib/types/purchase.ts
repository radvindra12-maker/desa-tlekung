export interface PurchaseItemInput {
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  thumbnail: string;
  quantity: number;
  price: number | null;
  priceOnRequest: boolean;
}

export interface PurchaseItem extends PurchaseItemInput {
  id: string;
}