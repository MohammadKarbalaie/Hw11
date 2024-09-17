import {urls} from "../url.ts"
import { httpClient } from '../client.ts';  
  
interface LoginCredentials {  
  username: string;  
  password: string;  
}  
  
interface AuthResponse {  
  token: string;  
  expiration: number;  
} 

interface SignupCredentials {  
  username: string;  
  password: string;  
}   
interface SignupResponse {  
  user: {  
   username: string;  
   id: number;  
  };  
  token: string;  
}  
  
export async function login(data: LoginCredentials): Promise<AuthResponse> {  
  const response = await httpClient().post(urls.auth.login, data);  
  return response.data;  
}

export async function signup(data: SignupCredentials): Promise<SignupResponse> {  
  const response = await httpClient().post(urls.auth.signup, data);  
  return response.data;  
}