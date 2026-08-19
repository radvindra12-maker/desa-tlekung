import type { PurchaseItem } from "@/types/purchase";
import type { PurchaseWizardValues } from "@/lib/validation/purchase-wizard-schema";

type RegionNames = {
  province: string;
  city: string;
  district: string;
  village: string;
};

export function mapPurchaseRequest(
  data: PurchaseWizardValues,
  regionNames: RegionNames
) {
  return {
    full_name: data.buyer.fullName,

    organization:
      data.buyer.organization || null,

    position:
      data.buyer.position || null,

    email: data.buyer.email,

    phone: data.buyer.phone,

    province_code: data.address.province,
    province_name: regionNames.province,

    city_code: data.address.city,
    city_name: regionNames.city,

    district_code: data.address.district,
    district_name: regionNames.district,

    village_code: data.address.village,
    village_name: regionNames.village,

    postal_code: data.address.postalCode,

    full_address: data.address.fullAddress,

    notes: data.request.notes || null,
  };
}

export function mapPurchaseRequestItems(
  items: PurchaseItem[],
  purchaseRequestId: string
) {
  return items.map((item) => ({
    purchase_request_id: purchaseRequestId,

    product_id: item.productId,

    variant_id: item.variantId,

    product_name: item.productName,

    variant_name: item.variantName,

    thumbnail: item.thumbnail || null,

    quantity: item.quantity,

    price: item.price,

    price_on_request: item.priceOnRequest,
  }));
}