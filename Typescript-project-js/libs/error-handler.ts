import { removeSessionToken } from "./session-manager";
// import { toast } from "./toast"; 

export const errorHandler = (error: any): void => {
  const message: string | string[] | undefined = error.response?.data?.message;

  if (typeof message === "string") {
    // toast// toast(message);
  } else if (Array.isArray(message)) {
    message.forEach((msgText: string) => {
        // toast;//   toast(msgText);
    });
  }

  const statusCode: number = Number(error.response?.data?.statusCode || 0);
  if (statusCode === 403) {
    // toast// toast("Please login again");
    removeSessionToken();
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }
};
