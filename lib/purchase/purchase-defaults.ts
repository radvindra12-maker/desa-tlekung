import type { PurchaseWizardData } from "@/types/purchase-wizard";

export const defaultPurchaseWizardData: PurchaseWizardData = {
  buyer: {
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    position: "",
  },

  address: {
    province: "",
    city: "",
    district: "",
    village: "",
    postalCode: "",
    fullAddress: "",
  },

  request: {
    notes: "",
  },
};