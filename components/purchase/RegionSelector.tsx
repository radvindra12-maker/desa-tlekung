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
    async function load() {
      setLoading(true);

      try {
        if (level === 0) {
          const { data, error } = await getProvinces();

          if (error) throw error;

          setOptions(data ?? []);
        } else if (parentCode) {
          const { data, error } = await getChildren(parentCode);

          if (error) throw error;

          setOptions(data ?? []);
        } else {
          setOptions([]);
        }
      } catch (err) {
        console.error(err);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [level, parentCode]);

  return (
    <Select
      value={value}
      disabled={loading || disabled}
      onValueChange={(value) => {
        if (value) onChange(value);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {loading ? (
          <SelectItem value="loading" disabled>
            Memuat...
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