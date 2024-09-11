import { urls } from "../url";  
import { httpClient } from "../client";  

interface Product {  
    id: number;  
    pid: number;  
    name: string;  
    imageURL: string;  
    colors: string; // اگر رنگ‌ها هم وجود داشته باشند  
    sizes: string; // مثال: "41|43|45"  
    price: number;  
    category: string; // مانند "CASUAL"  
    gender: string; // مانند "MEN"  
    brand: string;  
}  

interface SearchResponse {  
    data: Product[]; // آرایه‌ای از محصولات  
    total: number; // تعداد کل محصولات  
    totalPages: number; // تعداد صفحات  
    page: number; // صفحه فعلی  
    perPage: number; // تعداد محصولات در هر صفحه  
}  

// استفاده از نوع جستجو  
interface SearchParams {  
    page: number;  
    limit: number;  
    search?: string;  
}  

export async function getSearch(page: number, search?: string): Promise<SearchResponse> {  
    const params: SearchParams = { page, limit: 10 };  
    if (search) {  
        params.search = search;  
    }   
    // واکشی اطلاعات جستجو از API  
    const response = await httpClient().get<SearchResponse>(urls.sneaker, { params });   
    return response.data;  
}  