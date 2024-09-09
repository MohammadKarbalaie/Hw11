import Toast from 'typescript-toastify'

export const toast = new Toast({
  position: "top-right",
  toastMsg: "🌏 Hello, World!",
  autoCloseTime: 4500,
  canClose: true,
  showProgress: true,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  type: "error",
  theme: "dark"
});

