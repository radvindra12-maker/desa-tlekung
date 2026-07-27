import { z } from "zod";

import { buyerInformationSchema } from "./purchase-schema";

export const purchaseWizardSchema = z.object({
  buyer: buyerInformationSchema,

  address: z.object({
  province: z.string(),
  city: z.string(),
  district: z.string(),
  village: z.string(),
  postalCode: z.string(),
  fullAddress: z.string(),
}),

  request: z.object({
    notes: z.string(),
  }),
});

export type PurchaseWizardValues =
  z.infer<typeof purchaseWizardSchema>;