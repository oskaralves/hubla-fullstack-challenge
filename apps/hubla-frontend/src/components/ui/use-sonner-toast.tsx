import { ReactNode } from "react";
import { ExternalToast, toast as sonnerToast, ToastT } from "sonner";

type UseSonnerToastOptions = ExternalToast & {
  title: ReactNode;
  description?: ReactNode;
  type?: ToastT["type"];
};

export const useSonnerToast = () => {
  const showToast = ({
    title,
    description,
    ...toastOptions
  }: UseSonnerToastOptions) => {
    return sonnerToast(title, {
      description,
      ...toastOptions,
    });
  };

  const closeToast = (toastId: string | number) => {
    sonnerToast.dismiss(toastId);
  };

  return { showToast, closeToast };
};
