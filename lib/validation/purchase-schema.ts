import { z } from "zod";

export const buyerInformationSchema = z.object({
  fullName: z
    .string()
    .min(3, "Nama minimal 3 karakter"),

  email: z
  .string()
  .email("Email tidak valid"),

  phone: z
  .string()
  .min(10, "Nomor WhatsApp tidak valid"),

  organization: z
    .string()
    .optional(),

  position: z
    .string()
    .optional(),
});

export type BuyerInformationValues =
  z.infer<typeof buyerInformationSchema>;