import { urls } from "../url";
import { httpClient } from "../client";

interface Params {
  page: number;
  limit: number;
  brands?: string[];
}

export async function getBrandByName(page: number, brands: string[] | null = null): Promise<Params> {
  const params: Params = { page, limit: 10 };
  if (brands) {
    params.brands = brands;
  }

  const response = await httpClient().get(urls.sneaker, { params });
  
  return response.data;
}

interface Brands {  
  brands: string[];  
}  

export async function getBrands(): Promise<Brands> {  
    const response = await httpClient().get(urls.brands);   
    return {  
        brands: response.data, 
    };  
}  

