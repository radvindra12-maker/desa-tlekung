import {
  getChildren,
  getProvinces,
  getRegion,
} from "./region-query";

export async function listProvinces() {
  const { data, error } = await getProvinces();

  if (error) throw error;

  return data ?? [];
}

export async function listChildren(parentCode: string) {
  const { data, error } = await getChildren(parentCode);

  if (error) throw error;

  return data ?? [];
}

export async function findRegion(code: string) {
  const { data, error } = await getRegion(code);

  if (error) throw error;

  return data;
}