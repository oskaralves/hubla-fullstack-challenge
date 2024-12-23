"use server";

import { signIn } from "@/auth";
import { api } from "@/lib/api";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas/login-schema";
import { AuthError } from "next-auth";
import { z } from "zod";

export const accessAction = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "invalid fields!" };
  }

  const { email, password } = validateFields.data;
  try {
    const res = await api.fetch(`/auth/access`, {
      body: JSON.stringify({ email, password }),
      method: "POST",
      withCredentials: false,
    });

    if (!res.ok) {
      const data = await res.json();
      return { error: data.message };
    }
  } catch (error: any) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "E-mail ou senha incorreta." };
      }
    }

    return {
      error: error?.response?.message || error?.message || "Fail",
    };
  }

  await signIn("credentials", {
    email,
    password,
    redirectTo: DEFAULT_LOGIN_REDIRECT,
  });
};
