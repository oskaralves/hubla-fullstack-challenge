import { UserRoleEnum } from "@/types/role";
import { DefaultSession, DefaultUser } from "next-auth";
import "next-auth/jwt";

export type UserRole = {
  role: UserRoleEnum;
};

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  name?: string;
  nickname?: string;
  email: string;
  image?: string;
  accessToken: string;
  refreshToken: string;
  roles: UserRole[];
};

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    nickname?: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires: number;
    roles?: UserRole[];
  }
}

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    nickname?: string;
    accessToken: string;
    refreshToken: string;
    roles: UserRole[];
  }

  interface Session extends DefaultSession {
    user: ExtendedUser;
  }
}
