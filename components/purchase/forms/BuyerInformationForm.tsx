"use client";

import { useFormContext } from "react-hook-form";

import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/patterns/PageHeader";

import type { PurchaseWizardValues } from "@/lib/validation/purchase-wizard-schema";

type BuyerInformationFormProps = {
  onNext: () => void;
};

export default function BuyerInformationForm({
  onNext,
}: BuyerInformationFormProps) {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<PurchaseWizardValues>();

  const handleNext = async () => {
    console.log("BUTTON CLICK");

    const isValid = await trigger([
      "buyer.fullName",
      "buyer.email",
      "buyer.phone",
      "buyer.organization",
      "buyer.position",
    ]);

    console.log("BUYER VALID:", isValid);

    if (!isValid) {
      console.log("BUYER VALIDATION FAILED");
      return;
    }

    console.log("BUYER VALIDATION SUCCESS");
    console.log("NEXT STEP");

    onNext();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Informasi Pembeli"
        description="Lengkapi data pembeli sebelum melanjutkan."
      />

      <div>
        <Label htmlFor="fullName">
          Nama Lengkap
        </Label>

        <Input
          id="fullName"
          placeholder="Masukkan nama lengkap"
          {...register("buyer.fullName")}
        />

        {errors.buyer?.fullName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.buyer.fullName.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="email">
          Email
        </Label>

        <Input
          id="email"
          type="email"
          placeholder="contoh@email.com"
          {...register("buyer.email")}
        />

        {errors.buyer?.email && (
          <p className="mt-1 text-sm text-red-600">
            {errors.buyer.email.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">
          Nomor WhatsApp
        </Label>

        <Input
          id="phone"
          placeholder="08xxxxxxxxxx"
          {...register("buyer.phone")}
        />

        {errors.buyer?.phone && (
          <p className="mt-1 text-sm text-red-600">
            {errors.buyer.phone.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="organization">
          Instansi / Organisasi
        </Label>

        <Input
          id="organization"
          placeholder="Opsional"
          {...register("buyer.organization")}
        />
      </div>

      <div>
        <Label htmlFor="position">
          Jabatan
        </Label>

        <Input
          id="position"
          placeholder="Opsional"
          {...register("buyer.position")}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="button"
          onClick={handleNext}
        >
          Selanjutnya
        </Button>
      </div>
    </div>
  );
}