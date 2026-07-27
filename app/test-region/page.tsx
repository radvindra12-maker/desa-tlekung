import { listProvinces } from "@/lib/regions/region-repository";

export default async function TestRegionPage() {
  const provinces = await listProvinces();

  return (
    <pre>{JSON.stringify(provinces.slice(0, 10), null, 2)}</pre>
  );
}