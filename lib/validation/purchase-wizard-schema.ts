import { z } from "zod";

import { buyerInformationSchema } from "./purchase-schema";

export const purchaseWizardSchema = z.object({
  buyer: buyerInformationSchema,

  address: z.object({
    province: z.string().min(1, "Provinsi wajib dipilih"),
    city: z.string().min(1, "Kabupaten / Kota wajib dipilih"),
    district: z.string().min(1, "Kecamatan wajib dipilih"),
    village: z.string().min(1, "Desa / Kelurahan wajib dipilih"),
    postalCode: z
      .string()
      .regex(/^\d{5}$/, "Kode pos harus 5 digit"),
    fullAddress: z
      .string()
      .min(5, "Alamat lengkap wajib diisi"),
  }),

  request: z.object({
    notes: z.string(),
  }),
});

export type PurchaseWizardValues =
  z.infer<typeof purchaseWizardSchema>;