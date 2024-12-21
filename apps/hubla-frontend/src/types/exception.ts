export type ExceptionError = {
  statusCode?: number;
  message?: string;
  code?: number; //@todo: update to enum ErrorCodeEnum
};

export type ResponseException = {
  error?: ExceptionError;
};
