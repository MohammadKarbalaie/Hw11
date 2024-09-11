import { urls } from "../url";
import { httpClient } from "../client";
interface Product {  
  id: number;  
  pid: number;  
  name: string;  
  imageURL: string;  
  colors: string; 
  price: number;  
}  
interface ProductResponse {  
  total: number; 
  data: Product[]; 
}  

interface Params {  
  page: number;  
  limit: number;  
  brands?: string[];  
}  

export async function getProducts(page: number, brands: string[] | null = null): Promise<ProductResponse> {  
  const params: Params = { page, limit: 10 };  
  if (brands) {  
      params.brands = brands;  
  }  
  const response = await httpClient().get<ProductResponse>(urls.sneaker, { params });  
  return response.data;  
}  