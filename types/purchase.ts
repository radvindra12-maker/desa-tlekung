export type BuyerType =
  | "retail"
  | "reseller"
  | "cafe"
  | "distributor";

export type PurchaseStatus =
  | "submitted"
  | "reviewed"
  | "contacted"
  | "negotiation"
  | "confirmed"
  | "cancelled";

export interface PurchaseItem {
  id: string;

  productId: string;
  variantId: string;

  productName: string;
  variantName: string;

  thumbnail: string;

  quantity: number;

  price: number | null;
  priceOnRequest: boolean;
}

export type PurchaseItemInput = Omit<PurchaseItem, "id">;

export interface PurchaseCustomer {
  customerName: string;
  companyName?: string;

  email: string;
  phone: string;
}

export interface PurchaseAddress {
  recipientName?: string;

  province: string;
  city: string;
  district: string;
  postalCode: string;

  fullAddress: string;
}

export interface PurchaseRequestForm {
  items: PurchaseItem[];

  customer: PurchaseCustomer;

  address: PurchaseAddress;

  buyerType: BuyerType;

  monthlyEstimation?: string;

  note?: string;
}