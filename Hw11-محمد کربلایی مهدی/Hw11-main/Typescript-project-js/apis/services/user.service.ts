import { urls } from "../url";
import { httpClient } from "../client";

interface UserInfo {  
  id: number;  
  username: string;  
  sessions: Array<{  
      id: number;  
      token: string;  
      expiration: number;  
  }>;  
}  

export async function getUserInfo(): Promise<UserInfo> {  
  const response = await httpClient().get(urls.user);  
  return response.data;  
}  

