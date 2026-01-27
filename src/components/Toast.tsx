import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastProps = {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center";
};

export const Toast = ({ position = "top-center" }: ToastProps) => {
  return (
    <ToastContainer
      position={position}
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      transition={Slide}
      theme="colored"
    />
  );
};

export const toastSuccess = (message: string) => {
  toast.success(message);
};

export const toastError = (message: string) => {
  toast.error(message);
};

export const toastInfo = (message: string) => {
  toast.info(message);
};

export const toastWarning = (message: string) => {
  toast.warning(message);
};
