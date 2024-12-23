"use server";

import { api } from "@/lib/api";
import { NewPasswordSchema } from "@/schemas/new-password-schema";
import { z } from "zod";

export const newPasswordAction = async (
  values: z.infer<typeof NewPasswordSchema>
) => {
  try {
    const validateFields = NewPasswordSchema.safeParse(values);

    if (!validateFields.success) {
      return { error: "invalid fields !" };
    }

    const { code, password, passwordConfirmation } = validateFields.data;

    const res = await api.fetch(`/auth/password/reset`, {
      body: JSON.stringify({ code, password, passwordConfirmation }),
      method: "POST",
      withCredentials: false,
    });

    if (res.ok) {
      return {
        success: "Senha atualizada com sucesso!",
      };
    }
    const { error } = await res.json();

    return { error: error?.message || "" };
  } catch (error: any) {
    return {
      error: error?.response?.message || error?.message || "Fail",
    };
  }
};
