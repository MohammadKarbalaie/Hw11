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

// class Session {  
//   id: number;  
//   token: string;  
//   expiration: number;  

//   constructor(id: number, token: string, expiration: number) {  
//       this.id = id;  
//       this.token = token;  
//       this.expiration = expiration;  
//   }  
// }  

// class UserInfo {  
//   id: number;  
//   username: string;  
//   sessions: Session[];  

//   constructor(id: number, username: string, sessions: Session[]) {  
//       this.id = id;  
//       this.username = username;  
//       this.sessions = sessions;  
//   }  
// }  

// export async function getUserInfo(): Promise<UserInfo> {  
//   const response = await httpClient().get(urls.user);  
//   const { id, username, sessions } = response.data;  

//   const sessionObjects = sessions.map((session: { id: number; token: string; expiration: number }) => {  
//       return new Session(session.id, session.token, session.expiration);  
//   });  

//   return new UserInfo(id, username, sessionObjects);  
 