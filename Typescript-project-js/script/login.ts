import { login } from "../apis/services/auth.service.ts";
import { errorHandler } from "../libs/error-handler";
import { setSessionToken } from "../libs/session-manager";

const loginForm = document.getElementById("login-form") as HTMLFormElement;
loginForm.addEventListener("submit", async (event: Event) => {
  event.preventDefault();
  const usernameInput = (event.target as HTMLFormElement).username as HTMLInputElement;
  const passwordInput = (event.target as HTMLFormElement).password as HTMLInputElement;
  try {
    const response = await login({
      username: usernameInput.value,
      password: passwordInput.value,
    });
    setSessionToken(response.token);
    console.log(response);
    // toast // toast("Logged in", "success");
    setTimeout(() => {
      window.location.href = "/home";
    }, 3000);
  } catch (error) {
    console.log(error);
    errorHandler(error);
  }
});