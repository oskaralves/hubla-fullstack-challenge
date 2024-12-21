import { ResponseException } from './exception';

export type Link = {
  prev?: string | null;
  next?: string | null;
};

export type Meta = {
  timestamp?: Date;
};

export type PagedResponse<T = any> = {
  rows?: T[];
  countRows?: number;
  totalRows?: number;
  currentPage?: number;
  totalPages?: number;
  hasMore?: boolean;
  links?: Link;
  meta?: Meta;
} & ResponseException;

export type Response<T = any> = T & Partial<ResponseException>;
