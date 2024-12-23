import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  providers: [],
  trustHost: process.env.NEXTAUTH_TRUST_HOST === "true",
} satisfies NextAuthConfig;
