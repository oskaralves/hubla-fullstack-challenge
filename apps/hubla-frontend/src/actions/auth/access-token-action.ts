"use server";

import { api } from "@/lib/api";
import { Response } from "@/types/paged-response";
import { AccessTokenUser } from "@/types/user";

type AccessTokenProps = {
  email: string;
  password: string;
};

export const accessTokenAction = async ({
  email,
  password,
}: AccessTokenProps): Promise<Response<AccessTokenUser>> => {
  try {
    const res = await api.fetch(`/auth/access`, {
      body: JSON.stringify({ email, password }),
      method: "POST",
      withCredentials: false,
    });

    if (res.ok) {
      return (await res.json()) as Response<AccessTokenUser>;
    }

    return (await res.json()) as Response<AccessTokenUser>;
  } catch (error: any) {
    return {
      error: error.response,
    } as Response<AccessTokenUser>;
  }
};
