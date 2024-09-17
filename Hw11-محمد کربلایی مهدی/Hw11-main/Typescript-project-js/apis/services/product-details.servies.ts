import { urls } from "../url";
import { httpClient } from "../client";
export interface Product {  
    imageURL: string;  
    name: string;  
    price: number;  
    sizes: string; // e.g., "S|M|L"  
    colors: string; // e.g., "#FFFFFF|#000000"  
}  
export async function GetProductsInfo(id: number): Promise<Product> {  
    const response = await httpClient().get(urls.sneakeritm(id));  
    return response.data;  
}  
