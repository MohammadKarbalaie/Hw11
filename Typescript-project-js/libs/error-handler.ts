import { removeSessionToken } from "./session-manager";
import { toast } from "./toast"; 

interface Error {  
  response?: {  
    data?: {  
      message?: string | string[];  
      statusCode?: number;  
    };  
  };  
}  

export const errorHandler = (error : Error): void => {
  const message: string | string[] | undefined = error.response?.data?.message;

  if (typeof message === "string") {
     toast(message);
  } else if (Array.isArray(message)) {
    message.forEach((msgText: string) => {
      toast(msgText);
    });
  }

  const statusCode: number = Number(error.response?.data?.statusCode || 0);
  if (statusCode === 403) {
   toast("Please login again");
    removeSessionToken();
    setTimeout(() => {
      window.location.href = "/login.html";
    }, 3000);
  }
};
