import { urls } from "../url";
import { httpClient } from "../client";

interface Params {
  page: number;
  limit: number;
  brands?: string[];
}

export async function getProducts(page: number, brands: string[] | null = null): Promise<any> {  
  const params: Params = { page, limit: 10 };  
  if (brands) {  
   params.brands = brands;  
  }  
  const response = await httpClient().get<any>(urls.sneaker, { params });  
  return response.data;  
}