export type PurchaseWizardData = {
  buyer: {
    fullName: string;
    email: string;
    phone: string;
    organization?: string;
    position?: string;
  };

  address: {
    province: string;
    city: string;
    district: string;
    village: string;
    postalCode: string;
    fullAddress: string;
  };

  request: {
    notes: string;
  };
};