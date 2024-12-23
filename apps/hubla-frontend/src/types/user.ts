import { CommonStatusEnum } from "./common";
import { ResponseException } from "./exception";
import { UserRoleEnum } from "./role";

export type AccessTokenUser = User & {
  accessToken: string;
  refreshToken: string;
};

export type UserGenderEnum =
  | "MALE"
  | "FEMALE"
  | "NON_BINARY"
  | "TRANSGENDER"
  | "GENDER_FLUID"
  | "AGENDER"
  | "BIGENDER"
  | "OTHER"
  | "PREFER_NOT_TO_SAY";

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | string;
  cellphone?: string;
  cellphoneVerified: Date | string;
  gender?: UserGenderEnum;
  birthDate?: Date | string;
  password: string;
  nickname?: string | null;
  username?: string;
  image?: string | null;
  coverImage?: string | null;
  createdAt: Date;
  updatedAt: Date;
  status?: CommonStatusEnum;
  roles: UserRole[];
} & ResponseException;

export type UserRole = {
  role: UserRoleEnum;
};
