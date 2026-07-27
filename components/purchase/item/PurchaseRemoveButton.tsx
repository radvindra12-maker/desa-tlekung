import { Trash2 } from "lucide-react";

type PurchaseRemoveButtonProps = {
  onRemove: () => void;
};

export default function PurchaseRemoveButton({
  onRemove,
}: PurchaseRemoveButtonProps) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="
        inline-flex
        items-center
        gap-2
        rounded-lg
        px-3
        py-2
        text-sm
        font-medium
        text-red-600
        transition-all
        duration-200
        hover:bg-red-50
        hover:text-red-700
      "
    >
      <Trash2 className="h-4 w-4" />

      <span>Hapus</span>
    </button>
  );
}