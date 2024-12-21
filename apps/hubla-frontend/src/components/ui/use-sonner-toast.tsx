import { ReactNode } from "react";
import { ExternalToast, toast as sonnerToast, ToastT } from "sonner";

type UseSonnerToastOptions = ExternalToast & {
  title: ReactNode;
  description?: ReactNode;
  type?: ToastT["type"];
};

// Hook personalizado para exibir toasts com suporte para variantes
export const useSonnerToast = () => {
  const showToast = ({
    title,
    description,
    ...toastOptions
  }: UseSonnerToastOptions) => {
    // Definindo o ícone com base na variante ou ícone customizado

    return sonnerToast(title, {
      description,
      ...toastOptions,
    });
  };

  const closeToast = (toastId: string | number) => {
    // Fecha o toast com o ID fornecido
    sonnerToast.dismiss(toastId);
  };

  return { showToast, closeToast };
};
