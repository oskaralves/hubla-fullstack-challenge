import { ExceptionError } from './exception';

export type CommonStatusEnum = 'DISABLED' | 'ENABLED' | 'REMOVED';

export type SearchParams = { [key: string]: string | undefined };

export type ResponseSuccess<T> = {
  success: true;
  data: T;
};

export type ResponseError = {
  success: false;
  error: ExceptionError;
};

export type ResponseResult<T> = ResponseSuccess<T> | ResponseError;

