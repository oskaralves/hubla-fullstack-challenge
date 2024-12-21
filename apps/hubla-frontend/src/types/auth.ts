export type SessionUser = {
  id: string;
  name: string;
  email: string;
};

export type ResponseAuth = SessionUser & {
  accessToken: string;
  refreshToken: string;
};
