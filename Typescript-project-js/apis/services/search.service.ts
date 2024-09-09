import { urls } from "../url";
import { httpClient } from "../client";

interface SearchParams {
    page: number;
    limit: number;
    search?: string;
}

export async function getSearch(page: number, search?: string): Promise<any> {  
    const params: SearchParams = { page, limit: 42 };  
    if (search) {  
       params.search = search;  
    } 
    
    const response = await httpClient().get(urls.sneaker, { params }); 
    return response.data;  
}