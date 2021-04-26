import { ToastContainer, toast } from "react-toastify";

function createNotification(type, message, customId, redirect) {
  toast[type](message, {
    toastId: customId,
    pauseOnFocusLoss: false,
    position: "bottom-left",
    autoClose: 3000,
    onClick: ()=> {
      if (redirect) return window.location.href = redirect
      else return null
    }
  });

}

export { createNotification, ToastContainer, toast };
