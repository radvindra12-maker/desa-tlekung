type Specification = {
  value: string;

  specification_definitions: {
    id: string;
    name: string;
    unit: string | null;
    sort_order: number;
  } | null;
};

type Props = {
  specifications: Specification[];
};

export default function ProductSpecificationTable({
  specifications,
}: Props) {
  const sorted = [...specifications].sort(
    (a, b) =>
      (a.specification_definitions?.sort_order ?? 0) -
      (b.specification_definitions?.sort_order ?? 0)
  );


  return (
    <div className="mt-14">
      <h2 className="text-2xl font-bold mb-6">
        Spesifikasi Produk
      </h2>

      <div className="rounded-3xl border border-stone-300 overflow-hidden">

        {sorted.map((spec) => (
          <div
            key={spec.specification_definitions?.id}
            className="grid grid-cols-2 border-b border-stone-300 last:border-none"
          >
            <div className="bg-stone-100 p-5 font-medium">
              {spec.specification_definitions?.name}
            </div>

            <div className="p-5">
              {spec.value}

              {spec.specification_definitions?.unit
                ? ` ${spec.specification_definitions.unit}`
                : ""}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}