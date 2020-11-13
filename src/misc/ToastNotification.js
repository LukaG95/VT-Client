import { ToastContainer, toast } from "react-toastify";

function createNotification(type, message, customId) {
  toast[type](message, {
    toastId: customId,
    pauseOnFocusLoss: false,
    position: "bottom-left",
    autoClose: 3000,
  });
}

export {createNotification, ToastContainer, toast}