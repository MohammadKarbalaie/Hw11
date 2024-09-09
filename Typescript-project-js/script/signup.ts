import { toast } from "../libs/toast";
import { signup } from "../apis/services/auth.service";
import { errorHandler } from "../libs/error-handler";
import { setSessionToken } from "../libs/session-manager";

const signupForm = document.getElementById("signup") as HTMLFormElement;
signupForm.addEventListener("submit", async (event: Event) => {
  event.preventDefault();
  const usernameInput = (event.target as HTMLFormElement).username as HTMLInputElement;
  const passwordInput = (event.target as HTMLFormElement).password as HTMLInputElement;
  try {
    const response = await signup({
      username: usernameInput.value,
      password: passwordInput.value,
    });
    setSessionToken(response.token);
    toast// toast("Signed in", "success");
    console.log(response);
    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  } catch (error) {
    errorHandler(error);
  }
});
