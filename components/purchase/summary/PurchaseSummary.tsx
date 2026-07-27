import Link from "next/link";




type PurchaseSummaryProps = {
  productCount: number;
  totalQuantity: number;
  estimatedTotal: number;
  hasPriceOnRequest: boolean;

  footer?: React.ReactNode;
};

export default function PurchaseSummary({
  productCount,
  totalQuantity,
  estimatedTotal,
  hasPriceOnRequest,
  footer,
}: PurchaseSummaryProps) {
    
    
console.log("PurchaseSummary Props");
console.log({
  productCount,
  totalQuantity,
  estimatedTotal,
  footer,
});

 return (
  <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
    <h2 className="text-xl font-semibold">
      Ringkasan Permintaan
    </h2>

    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-stone-600">
          Produk
        </span>

        <span className="font-medium">
          {productCount}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-stone-600">
          Total Item
        </span>

        <span className="font-medium">
          {totalQuantity}
        </span>
      </div>
    </div>

    <div className="my-6 border-t border-stone-200" />

    <div>
      <p className="text-sm text-stone-500">
        Estimasi Total
      </p>

      {hasPriceOnRequest ? (
  <p className="mt-2 text-xl font-bold text-amber-700">
    Harga berdasarkan permintaan
  </p>
) : (
  <p className="mt-2 text-3xl font-bold text-amber-700">
    Rp {estimatedTotal.toLocaleString("id-ID")}
  </p>
)}
    </div>

    {footer && (
  <div className="mt-8">
    {footer}
  </div>
)}
  </div>
);
}