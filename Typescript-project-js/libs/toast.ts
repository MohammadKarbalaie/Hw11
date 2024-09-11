import StartToastifyInstance from "toastify-js";


export const toast = (text: string, mode= "error") => {
  StartToastifyInstance({
    text,
    duration: 4000,
    close: true,
    position:"right",
    style: {
      background: mode === "success" ? "#40e37e" : "#a3000e",
      padding:"10px 50px",
      margin:"10px 30px",
      color: "white",
      fontSize: "18px",
      fontWeight: "600",
      borderRadius: "30px",
    },
  }).showToast();
};