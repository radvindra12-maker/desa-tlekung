"use client";

import { useFormContext } from "react-hook-form";

import Textarea from "@/components/ui/textarea";
import Label from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/patterns/PageHeader";

import type { PurchaseWizardValues } from "@/lib/validation/purchase-wizard-schema";

type RequestInformationFormProps = {
  onNext: () => void;
};

export default function RequestInformationForm({
  onNext,
}: RequestInformationFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext<PurchaseWizardValues>();

  const onSubmit = () => {
    console.log("REQUEST SUBMIT");
    console.log("REQUEST DATA:", watch("request"));

    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <PageHeader
        title="Informasi Permintaan"
        description="Tambahkan catatan atau kebutuhan khusus jika diperlukan."
      />

      <div className="space-y-2">
        <Label htmlFor="notes">
          Catatan Permintaan
        </Label>

        <Textarea
          id="notes"
          placeholder="Contoh: Mohon konfirmasi ketersediaan produk, kebutuhan khusus, atau informasi lainnya."
          rows={6}
          {...register("request.notes")}
        />

        {errors.request?.notes && (
          <p className="text-sm text-red-600">
            {errors.request.notes.message}
          </p>
        )}

        <p className="text-sm text-stone-500">
          Kolom ini dapat digunakan untuk menyampaikan kebutuhan
          atau catatan tambahan kepada tim kami.
        </p>
      </div>

      <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
        <p className="font-semibold text-stone-900">
          Catatan
        </p>

        <p className="mt-1 text-sm leading-6 text-stone-600">
          Informasi tambahan yang Anda berikan akan membantu tim
          kami memahami kebutuhan permintaan pembelian Anda.
        </p>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit">
          Selanjutnya
        </Button>
      </div>
    </form>
  );
}