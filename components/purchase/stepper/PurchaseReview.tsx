"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getPurchaseItems } from "@/lib/purchase/purchase-storage";
import { Button } from "@/components/ui/button";
import { submitPurchaseRequest } from "@/lib/services/purchase/purchase.service";
import { clearPurchaseItems } from "@/lib/purchase/purchase-storage";
import type { PurchaseWizardValues } from "@/lib/validation/purchase-wizard-schema";
import { getRegion } from "@/lib/regions/region-query";

type RegionNames = {
  province: string;
  city: string;
  district: string;
  village: string;
};

export default function PurchaseReview() {
  const { watch } = useFormContext<PurchaseWizardValues>();

  const data = watch();

  const router = useRouter();

const [submitting, setSubmitting] = useState(false);

  const [regionNames, setRegionNames] = useState<RegionNames>({
    province: "",
    city: "",
    district: "",
    village: "",
  });

  const [loadingRegions, setLoadingRegions] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadRegionNames() {
      const {
        province,
        city,
        district,
        village,
      } = data.address;

      const codes = [
        province,
        city,
        district,
        village,
      ];

      if (codes.every((code) => !code)) {
        return;
      }

      setLoadingRegions(true);

      try {
        const results = await Promise.all(
          codes.map((code) =>
            code ? getRegion(code) : Promise.resolve({ data: null })
          )
        );

        if (cancelled) {
          return;
        }

        setRegionNames({
          province: results[0]?.data?.name ?? "",
          city: results[1]?.data?.name ?? "",
          district: results[2]?.data?.name ?? "",
          village: results[3]?.data?.name ?? "",
        });
      } catch (error) {
        console.error(
          "Failed to load region names:",
          error
        );
      } finally {
        if (!cancelled) {
          setLoadingRegions(false);
        }
      }
    }

    loadRegionNames();

    return () => {
      cancelled = true;
    };
  }, [
    data.address.province,
    data.address.city,
    data.address.district,
    data.address.village,
  ]);

  const handleSubmitRequest = async () => {
  if (submitting) {
    return;
  }

  setSubmitting(true);

  try {
    const items = getPurchaseItems();

    if (items.length === 0) {
      alert("Tidak ada produk yang dipilih.");
      return;
    }

   const result = await submitPurchaseRequest({
  data,
  regionNames,
  items,
});

clearPurchaseItems();

console.log(
  "Purchase request berhasil dibuat:",
  result.id
);

router.push(`/purchase/success/${result.id}`);
  } catch (error) {
    console.error(
      "Failed to submit purchase request:",
      error
    );

    alert(
      "Terjadi kesalahan saat mengirim permintaan pembelian."
    );
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-stone-900">
          Review Permintaan
        </h2>

        <p className="mt-2 text-stone-600">
          Periksa kembali seluruh data sebelum
          mengirimkan permintaan pembelian.
        </p>
      </div>

      {/* INFORMASI PEMBELI */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-stone-900">
            Informasi Pembeli
          </h3>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <ReviewItem
            label="Nama Lengkap"
            value={data.buyer.fullName}
          />

          <ReviewItem
            label="Email"
            value={data.buyer.email}
          />

          <ReviewItem
            label="Nomor WhatsApp"
            value={data.buyer.phone}
          />

          <ReviewItem
            label="Instansi / Organisasi"
            value={data.buyer.organization}
          />

          <ReviewItem
            label="Jabatan"
            value={data.buyer.position}
          />
        </div>
      </section>

      {/* ALAMAT PENGIRIMAN */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-stone-900">
          Alamat Pengiriman
        </h3>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <ReviewItem
            label="Provinsi"
            value={
              loadingRegions
                ? "Memuat..."
                : regionNames.province
            }
          />

          <ReviewItem
            label="Kabupaten / Kota"
            value={
              loadingRegions
                ? "Memuat..."
                : regionNames.city
            }
          />

          <ReviewItem
            label="Kecamatan"
            value={
              loadingRegions
                ? "Memuat..."
                : regionNames.district
            }
          />

          <ReviewItem
            label="Desa / Kelurahan"
            value={
              loadingRegions
                ? "Memuat..."
                : regionNames.village
            }
          />

          <ReviewItem
            label="Kode Pos"
            value={data.address.postalCode}
          />
        </div>

        <div className="mt-4">
          <ReviewItem
            label="Alamat Lengkap"
            value={data.address.fullAddress}
          />
        </div>
      </section>

      {/* INFORMASI PERMINTAAN */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-stone-900">
          Informasi Permintaan
        </h3>

        <div className="mt-5">
          <ReviewItem
            label="Catatan Permintaan"
            value={
              data.request.notes ||
              "Tidak ada catatan tambahan."
            }
          />
        </div>
      </section>

      {/* INFORMASI PENTING */}
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <h3 className="font-semibold text-amber-900">
          Perhatian
        </h3>

        <p className="mt-2 text-sm leading-6 text-amber-800">
          Pastikan seluruh data yang Anda masukkan
          sudah benar. Tim kami akan menghubungi Anda
          untuk melakukan konfirmasi mengenai
          ketersediaan produk, harga, dan pengiriman.
        </p>
      </section>

      {/* ACTION */}
      <div className="flex justify-end pt-2">
        <Button
  type="button"
  onClick={handleSubmitRequest}
  disabled={submitting || loadingRegions}
>
  {submitting
    ? "Mengirim..."
    : "Kirim Permintaan"}
</Button>
      </div>
    </div>
  );
}

type ReviewItemProps = {
  label: string;
  value?: string;
};

function ReviewItem({
  label,
  value,
}: ReviewItemProps) {
  return (
    <div>
      <p className="text-sm text-stone-500">
        {label}
      </p>

      <p className="mt-1 whitespace-pre-wrap text-sm font-medium text-stone-900">
        {value || "-"}
      </p>
    </div>
  );
}