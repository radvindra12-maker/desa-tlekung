import { supabase } from "@/lib/supabase/client";

import type { PurchaseItem } from "@/types/purchase";
import type { PurchaseWizardValues } from "@/lib/validation/purchase-wizard-schema";

import {
  mapPurchaseRequest,
  mapPurchaseRequestItems,
} from "./purchase.mapper";

type RegionNames = {
  province: string;
  city: string;
  district: string;
  village: string;
};

type SubmitPurchaseRequestInput = {
  data: PurchaseWizardValues;
  items: PurchaseItem[];
  regionNames: RegionNames;
};

export async function submitPurchaseRequest({
  data,
  items,
  regionNames,
}: SubmitPurchaseRequestInput) {
  if (items.length === 0) {
    throw new Error(
      "Tidak ada produk dalam permintaan pembelian."
    );
  }

  // ==========================================
  // 1. MAP DATA PEMBELI
  // ==========================================

  const purchaseRequest = mapPurchaseRequest(
    data,
    regionNames
  );

  // ==========================================
  // 2. SIMPAN PURCHASE REQUEST
  // ==========================================

  const {
    data: request,
    error: requestError,
  } = await supabase
    .from("purchase_requests")
    .insert(purchaseRequest)
    .select("id")
    .single();

  if (requestError || !request) {
    console.error(
      "Failed to create purchase request:",
      requestError
    );

    throw new Error(
      "Gagal menyimpan permintaan pembelian."
    );
  }

  // ==========================================
  // 3. MAP PRODUCT ITEMS
  // ==========================================

  const purchaseRequestItems =
    mapPurchaseRequestItems(
      items,
      request.id
    );

  // ==========================================
  // 4. SIMPAN PRODUCT ITEMS
  // ==========================================

  const {
    error: itemsError,
  } = await supabase
    .from("purchase_request_items")
    .insert(purchaseRequestItems);

  if (itemsError) {
    console.error(
      "Failed to create purchase request items:",
      itemsError
    );

    throw new Error(
      "Permintaan berhasil dibuat, tetapi detail produk gagal disimpan."
    );
  }

  // ==========================================
  // 5. RETURN PURCHASE REQUEST ID
  // ==========================================

  return {
    id: request.id,
  };
}