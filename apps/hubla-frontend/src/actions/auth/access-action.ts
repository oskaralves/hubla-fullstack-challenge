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

    // if (existingUser.isTwoFactorEnabled && existingUser.email) {
    //   if (code) {
    //     const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

    //     if (!twoFactorToken) {
    //       return { error: 'Invalid code!' };
    //     }

    //     if (twoFactorToken.token !== code) {
    //       return { error: 'Invalid code!' };
    //     }

    //     const hasExpired = new Date(twoFactorToken.expires) < new Date();

    //     if (hasExpired) {
    //       return { error: 'Code expired!' };
    //     }

    //     await db.twoFactorToken.delete({
    //       where: { id: twoFactorToken.id },
    //     });

    //     const existingConfirmation = await getTwoFactorConfirmationByUserId(
    //       existingUser.id
    //     );

    //     if (existingConfirmation) {
    //       await db.twoFactorConfirmation.delete({
    //         where: { id: existingConfirmation.id },
    //       });
    //     }

    //     await db.twoFactorConfirmation.create({
    //       data: {
    //         userId: existingUser.id,
    //       },
    //     });
    //   } else {
    //     const twoFactorToken = await generateTwoFactorToken(existingUser.email);
    //     await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

    //     return { twoFactor: true };
    //   }
    // }
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
