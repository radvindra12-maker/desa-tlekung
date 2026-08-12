"use client";

import { FormProvider, useForm } from "react-hook-form";
import AddressForm from "@/components/purchase/forms/AddressForm";

import type { PurchaseWizardValues } from "@/lib/validation/purchase-wizard-schema";

export default function TestAddressPage() {
  const methods = useForm<PurchaseWizardValues>({
    defaultValues: {
      address: {
        province: "",
        city: "",
        district: "",
        village: "",
        postalCode: "",
        fullAddress: "",
      },
    } as PurchaseWizardValues,
  });

  return (
    <FormProvider {...methods}>
      <main className="mx-auto max-w-xl space-y-6 p-8">
        <h1 className="text-3xl font-bold">
          Alamat Pengiriman
        </h1>

        <AddressForm onNext={() => {}} />
      </main>
    </FormProvider>
  );
}