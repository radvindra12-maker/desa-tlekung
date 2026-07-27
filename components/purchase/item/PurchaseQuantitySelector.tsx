type PurchaseQuantitySelectorProps = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function PurchaseQuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}: PurchaseQuantitySelectorProps) {
 return (
  <div className="inline-flex items-center rounded-xl border border-stone-200 bg-stone-50">
    <button
      type="button"
      onClick={onDecrease}
      className="px-4 py-2 text-lg font-semibold transition hover:bg-stone-100"
    >
      −
    </button>

    <span className="min-w-12 px-4 text-center font-medium">
      {quantity}
    </span>

    <button
      type="button"
      onClick={onIncrease}
      className="px-4 py-2 text-lg font-semibold transition hover:bg-stone-100"
    >
      +
    </button>
  </div>
);
}