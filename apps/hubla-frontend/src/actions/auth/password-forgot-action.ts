"use server";

import { api } from "@/lib/api";
import { PasswordForgotSchema } from "@/schemas/password-forgot-schema";
import { z } from "zod";

export const passwordForgotAction = async (
  values: z.infer<typeof PasswordForgotSchema>
) => {
  try {
    const validateFields = PasswordForgotSchema.safeParse(values);

    if (!validateFields.success) {
      return { error: "invalid fields !" };
    }

    const { email } = validateFields.data;

    const res = await api.fetch(`/auth/password/forgot`, {
      body: JSON.stringify({ email }),
      method: "POST",
      withCredentials: false,
    });

    if (res.ok) {
      return {
        success: "Código enviado para seu e-mail",
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
