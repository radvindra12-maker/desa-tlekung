"use client";

import { useState } from "react";

import RegionSelector from "../RegionSelector";

export default function AddressForm() {
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");

  function handleProvince(code: string) {
    setProvince(code);

    setCity("");
    setDistrict("");
    setVillage("");
  }

  function handleCity(code: string) {
    setCity(code);

    setDistrict("");
    setVillage("");
  }

  function handleDistrict(code: string) {
    setDistrict(code);

    setVillage("");
  }

  return (
    <div className="space-y-4">

      <RegionSelector
        level={0}
        value={province}
        placeholder="Pilih Provinsi"
        onChange={handleProvince}
      />

      <RegionSelector
        level={1}
        value={city}
        parentCode={province}
        placeholder="Pilih Kabupaten / Kota"
        disabled={!province}
        onChange={handleCity}
      />

      <RegionSelector
        level={2}
        value={district}
        parentCode={city}
        placeholder="Pilih Kecamatan"
        disabled={!city}
        onChange={handleDistrict}
      />

      <RegionSelector
        level={3}
        value={village}
        parentCode={district}
        placeholder="Pilih Desa / Kelurahan"
        disabled={!district}
        onChange={setVillage}
      />

      <div className="rounded-lg border p-4 bg-muted/30 text-sm space-y-2">

        <div>
          <strong>Provinsi :</strong> {province}
        </div>

        <div>
          <strong>Kabupaten :</strong> {city}
        </div>

        <div>
          <strong>Kecamatan :</strong> {district}
        </div>

        <div>
          <strong>Desa :</strong> {village}
        </div>

      </div>

    </div>
  );
}