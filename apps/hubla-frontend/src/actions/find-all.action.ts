"use server";

import { RequestOptions, api } from "@/lib/api";
import { ResponseException } from "@/types/exception";
import { PagedResponse } from "@/types/paged-response";
import { BuildQueryStringProps, buildQueryString } from "@/utils/url";

type FindAllActionProps = {
  endpoint: string;
  options?: RequestOptions;
} & BuildQueryStringProps;

export const findAllAction = async <T = any>({
  endpoint,
  options,
  ...props
}: FindAllActionProps): Promise<PagedResponse<T>> => {
  try {
    const url = `${endpoint}${buildQueryString(props)}`;
    const res = await api.fetch(url, {
      withCredentials: true,
      ...options,
    });

    if (res.ok) {
      return (await res.json()) as PagedResponse<T>;
    }
    return (await res.json()) as ResponseException;
  } catch (error: any) {
    const INTERNAT_SERVER_ERROR: ResponseException = {
      error: {
        code: error?.cause?.code || error?.code,
        message: "Sem resposta do servidor",
        statusCode: 500,
      },
    };
    return (error?.response?.data ||
      INTERNAT_SERVER_ERROR) as ResponseException;
  }
};
