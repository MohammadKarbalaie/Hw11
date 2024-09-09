import { urls } from "../url";
import { httpClient } from "../client";

export async function GetProductsInfo(id: number): Promise<any> {
    const response = await httpClient().get(urls.sneakeritm(id));
    return response.data;
}