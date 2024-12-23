import {
  ADMIN_TRANSACTION_LIST_URL,
  FORGOT_PASSWORD_URL,
  LOGIN_URL,
  NEW_PASSWORD_URL,
  REGISTER_URL,
} from "./navigation/urls";

export const publicRoutes = ["/"];

export const authRoutes = [
  LOGIN_URL,
  REGISTER_URL,
  FORGOT_PASSWORD_URL,
  NEW_PASSWORD_URL,
];

export const apiAuthPrefix = "api/auth";

export const DEFAULT_LOGIN_REDIRECT = ADMIN_TRANSACTION_LIST_URL;
