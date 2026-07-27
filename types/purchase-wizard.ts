import { BuyerInformationValues } from "@/lib/validation/purchase-schema";

export interface PurchaseWizardData {
  buyer: BuyerInformationValues;

  address: {
    province: string;
    city: string;
    district: string;
    postalCode: string;
    fullAddress: string;
  };

  request: {
    notes: string;
  };
}