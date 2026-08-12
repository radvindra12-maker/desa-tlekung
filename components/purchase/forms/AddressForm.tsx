"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/patterns/PageHeader";
import RegionSelector from "../RegionSelector";

import type { PurchaseWizardValues } from "@/lib/validation/purchase-wizard-schema";

import { getRegion } from "@/lib/regions/region-query";

type AddressFormProps = {
  onNext: () => void;
};

type RegionNames = {
  province: string;
  city: string;
  district: string;
  village: string;
};

const emptyRegionNames: RegionNames = {
  province: "",
  city: "",
  district: "",
  village: "",
};

export default function AddressForm({
  onNext,
}: AddressFormProps) {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useFormContext<PurchaseWizardValues>();

  const province = watch("address.province");
  const city = watch("address.city");
  const district = watch("address.district");
  const village = watch("address.village");

  const [regionNames, setRegionNames] =
    useState<RegionNames>(emptyRegionNames);

  const loadRegionName = async (
    code: string,
    field: keyof RegionNames
  ) => {
    if (!code) {
      return;
    }

    try {
      const { data, error } = await getRegion(code);

      if (error) {
        console.error(
          `Gagal mengambil nama wilayah ${code}:`,
          error
        );
        return;
      }

      if (data) {
        setRegionNames((prev) => ({
          ...prev,
          [field]: data.name,
        }));
      }
    } catch (error) {
      console.error(
        `Gagal mengambil nama wilayah ${code}:`,
        error
      );
    }
  };

  const handleProvinceChange = (code: string) => {
    setValue("address.province", code, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setValue("address.city", "", {
      shouldDirty: true,
      shouldValidate: true,
    });

    setValue("address.district", "", {
      shouldDirty: true,
      shouldValidate: true,
    });

    setValue("address.village", "", {
      shouldDirty: true,
      shouldValidate: true,
    });

    setRegionNames((prev) => ({
      ...emptyRegionNames,
      province: prev.province,
    }));

    loadRegionName(code, "province");
  };

  const handleCityChange = (code: string) => {
    setValue("address.city", code, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setValue("address.district", "", {
      shouldDirty: true,
      shouldValidate: true,
    });

    setValue("address.village", "", {
      shouldDirty: true,
      shouldValidate: true,
    });

    setRegionNames((prev) => ({
      ...prev,
      city: "",
      district: "",
      village: "",
    }));

    loadRegionName(code, "city");
  };

  const handleDistrictChange = (code: string) => {
    setValue("address.district", code, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setValue("address.village", "", {
      shouldDirty: true,
      shouldValidate: true,
    });

    setRegionNames((prev) => ({
      ...prev,
      district: "",
      village: "",
    }));

    loadRegionName(code, "district");
  };

  const handleVillageChange = (code: string) => {
    setValue("address.village", code, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setRegionNames((prev) => ({
      ...prev,
      village: "",
    }));

    loadRegionName(code, "village");
  };

  const onSubmit = (data: PurchaseWizardValues) => {
    console.log("ADDRESS SUBMIT");
    console.log("ADDRESS DATA:", data.address);

    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <PageHeader
        title="Alamat Pengiriman"
        description="Lengkapi alamat pengiriman untuk kebutuhan konfirmasi dan pengiriman."
      />

      {/* PROVINSI */}
      <div className="space-y-2">
        <Label>Provinsi</Label>

        <RegionSelector
          level={0}
          value={province}
          placeholder="Pilih Provinsi"
          onChange={handleProvinceChange}
        />

        {errors.address?.province && (
          <p className="text-sm text-red-600">
            {errors.address.province.message}
          </p>
        )}
      </div>

      {/* KABUPATEN / KOTA */}
      <div className="space-y-2">
        <Label>Kabupaten / Kota</Label>

        <RegionSelector
          level={1}
          value={city}
          parentCode={province}
          placeholder="Pilih Kabupaten / Kota"
          disabled={!province}
          onChange={handleCityChange}
        />

        {errors.address?.city && (
          <p className="text-sm text-red-600">
            {errors.address.city.message}
          </p>
        )}
      </div>

      {/* KECAMATAN */}
      <div className="space-y-2">
        <Label>Kecamatan</Label>

        <RegionSelector
          level={2}
          value={district}
          parentCode={city}
          placeholder="Pilih Kecamatan"
          disabled={!city}
          onChange={handleDistrictChange}
        />

        {errors.address?.district && (
          <p className="text-sm text-red-600">
            {errors.address.district.message}
          </p>
        )}
      </div>

      {/* DESA / KELURAHAN */}
      <div className="space-y-2">
        <Label>Desa / Kelurahan</Label>

        <RegionSelector
          level={3}
          value={village}
          parentCode={district}
          placeholder="Pilih Desa / Kelurahan"
          disabled={!district}
          onChange={handleVillageChange}
        />

        {errors.address?.village && (
          <p className="text-sm text-red-600">
            {errors.address.village.message}
          </p>
        )}
      </div>

      {/* KODE POS */}
      <div className="space-y-2">
        <Label htmlFor="postalCode">
          Kode Pos
        </Label>

        <Input
          id="postalCode"
          placeholder="Contoh: 65314"
          inputMode="numeric"
          maxLength={5}
          {...register("address.postalCode")}
        />

        {errors.address?.postalCode && (
          <p className="text-sm text-red-600">
            {errors.address.postalCode.message}
          </p>
        )}
      </div>

      {/* ALAMAT LENGKAP */}
      <div className="space-y-2">
        <Label htmlFor="fullAddress">
          Alamat Lengkap
        </Label>

        <textarea
          id="fullAddress"
          placeholder="Nama jalan, nomor rumah, RT/RW, dusun, atau detail alamat lainnya"
          rows={4}
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition-all placeholder:text-stone-400 focus:border-amber-700 focus:ring-4 focus:ring-amber-100"
          {...register("address.fullAddress")}
        />

        {errors.address?.fullAddress && (
          <p className="text-sm text-red-600">
            {errors.address.fullAddress.message}
          </p>
        )}
      </div>

      {/* PREVIEW DATA */}
      <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 text-sm">
        <p className="mb-3 font-semibold text-stone-900">
          Data Wilayah
        </p>

        <div className="space-y-1 text-stone-600">
          <p>
            <span className="font-medium text-stone-900">
              Provinsi:
            </span>{" "}
            {regionNames.province || "-"}
          </p>

          <p>
            <span className="font-medium text-stone-900">
              Kabupaten / Kota:
            </span>{" "}
            {regionNames.city || "-"}
          </p>

          <p>
            <span className="font-medium text-stone-900">
              Kecamatan:
            </span>{" "}
            {regionNames.district || "-"}
          </p>

          <p>
            <span className="font-medium text-stone-900">
              Desa / Kelurahan:
            </span>{" "}
            {regionNames.village || "-"}
          </p>
        </div>
      </div>

      {/* ACTION */}
      <div className="flex justify-end pt-4">
        <Button type="submit">
          Selanjutnya
        </Button>
      </div>
    </form>
  );
}