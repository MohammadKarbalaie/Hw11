import { urls } from "../url";
import { httpClient } from "../client";

interface LoginData {
  // Define the structure of login data
}

interface SignupData {
  // Define the structure of signup data
}

interface AuthResponse {
  // Define the structure of the response data
}

export async function login(data: LoginData): Promise<AuthResponse> {
  const response = await httpClient().post<AuthResponse>(urls.auth.login, data);
  return response.data;
}

export async function signup(data: SignupData): Promise<AuthResponse> {
  const response = await httpClient().post<AuthResponse>(urls.auth.signup, data);
  return response.data;
}