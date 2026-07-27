import { PurchaseWizardData } from "@/types/purchase-wizard";

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
    postalCode: "",
    fullAddress: "",
  },

  request: {
    notes: "",
  },
};