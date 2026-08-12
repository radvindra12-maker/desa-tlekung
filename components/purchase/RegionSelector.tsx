"use client";

import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  getChildren,
  getProvinces,
} from "@/lib/regions/region-query";

type Region = {
  code: string;
  name: string;
};

type Props = {
  value?: string;
  level: number;
  parentCode?: string;
  placeholder: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export default function RegionSelector({
  value,
  level,
  parentCode,
  placeholder,
  disabled = false,
  onChange,
}: Props) {
  const [options, setOptions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // Level 1, 2, 3 membutuhkan parent.
      if (level !== 0 && !parentCode) {
        setOptions([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const result =
          level === 0
            ? await getProvinces()
            : await getChildren(parentCode!);

        if (cancelled) {
          return;
        }

        if (result.error) {
          console.error(
            `REGION LEVEL ${level} QUERY ERROR:`,
            result.error
          );

          setOptions([]);
          return;
        }

        const regions = (result.data ?? []) as Region[];

        console.log(
          `REGION LEVEL ${level} OPTIONS:`,
          regions
        );

        setOptions(regions);
      } catch (error) {
        if (!cancelled) {
          console.error(
            `REGION LEVEL ${level} LOAD ERROR:`,
            error
          );

          setOptions([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [level, parentCode]);

  const isDisabled = disabled || loading;

  // Cari nama wilayah berdasarkan code yang sedang tersimpan.
  const selectedRegion = options.find(
    (region) => region.code === value
  );

  return (
    <Select
      value={value || null}
      onValueChange={(selectedValue) => {
        console.log(
          `REGION LEVEL ${level} CHANGED:`,
          selectedValue
        );

        // Base UI bisa mengirim string | null.
        if (selectedValue !== null) {
          onChange(selectedValue);
        }
      }}
    >
      <SelectTrigger
        className="w-full"
        disabled={isDisabled}
      >
        <SelectValue
          placeholder={
            loading ? "Memuat..." : placeholder
          }
        >
          {selectedRegion?.name}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {loading ? (
          <SelectItem
            value="__loading__"
            disabled
          >
            Memuat...
          </SelectItem>
        ) : options.length === 0 ? (
          <SelectItem
            value="__empty__"
            disabled
          >
            Tidak ada data
          </SelectItem>
        ) : (
          options.map((region) => (
            <SelectItem
              key={region.code}
              value={region.code}
            >
              {region.name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}