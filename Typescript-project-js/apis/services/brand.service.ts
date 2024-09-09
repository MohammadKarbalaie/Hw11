import { urls } from "../url";
import { httpClient } from "../client";

interface Params {
  page: number;
  limit: number;
  brands?: string[];
}

export async function getBrandByName(page: number, brands: string[] | null = null): Promise<any> {
  const params: Params = { page, limit: 10 };
  if (brands) {
    params.brands = brands;
  }
  const response = await httpClient().get(urls.sneaker, { params });
  return response.data;
}

export async function getBrands(): Promise<any> {
  const response = await httpClient().get(urls.brands);
  return response.data;
}
