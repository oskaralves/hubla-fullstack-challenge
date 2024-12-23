import { authConfig } from "@/auth.config";
import { jwtDecode } from "jwt-decode";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserRole } from "./types/user";

async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
      {
        headers: {
          Authorization: `Bearer ${token.refreshToken}`,
        },
      }
    );

    const tokens = await response.json();

    if (!response.ok) {
      throw tokens;
    }

    return {
      ...token,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/access`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!res.ok) {
            // credentials are invalid
            return null;
          }

          return await res.json();
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (token?.accessToken && typeof token.accessToken === "string") {
        const decodedToken = jwtDecode(token?.accessToken);
        token.accessTokenExpires = (decodedToken?.exp || 0) * 1000;
      }
      if (!token?.sub) return token;

      if (user) {
        token.nickname = user.nickname;
        token.roles = user.roles?.map((userRole: any) => ({
          role: userRole.role,
        }));
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.image = user.image;
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token?.sub && session?.user) {
        session.user.id = token.sub;
        session.user.image = token.image as string;
        session.user.nickname = token.nickname as string;
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
        session.user.roles = token?.roles as UserRole[];
      }

      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      if (account?.provider === "credentials") {
        // const existingUser = await getUserById(user.id);
        // if(!existingUser)
      }
      return true;
    },
  },
  debug: true,
});
