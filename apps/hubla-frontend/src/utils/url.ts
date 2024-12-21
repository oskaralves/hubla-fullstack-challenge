import { DEFAULT_ITEMS_PER_PAGE } from "@/constants";
import { parseNumberOrDefault } from "./number";

export type BuildQueryStringProps = {
  pageParam?: string;
  perPageParam?: string;
  searchParam?: string;
  sortParam?: string;
  transactionTypesParams?: string;
};

export const buildQueryString = ({
  pageParam = "1",
  perPageParam = DEFAULT_ITEMS_PER_PAGE.toString(),
  searchParam = "",
  sortParam = "",
  transactionTypesParams = "",
}: BuildQueryStringProps) => {
  const take = parseNumberOrDefault(perPageParam, DEFAULT_ITEMS_PER_PAGE);
  const page = parseNumberOrDefault(pageParam, 1);
  const skip = (page - 1) * take;

  const queryParams = [];

  if (skip > 0) queryParams.push(`skip=${skip}`);
  if (take > 0) queryParams.push(`take=${take}`);
  if (searchParam) queryParams.push(`search=${searchParam}`);
  if (sortParam) queryParams.push(`sort=${sortParam}`);
  if (transactionTypesParams)
    queryParams.push(`transactionTypes=${transactionTypesParams}`);

  return `?${queryParams.join("&")}`;
};

interface UpdateUrlParamsOptions {
  pathname: string;
  currentParams?: string;
  params?: Record<string, string | number>;
  remove?: string[];
}

export const updateUrlParams = (options: UpdateUrlParamsOptions): string => {
  const { pathname, currentParams, params, remove } = options;
  const searchParams = new URLSearchParams(currentParams);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (
        value !== null &&
        value !== undefined &&
        value.toString().trim() !== ""
      ) {
        searchParams.set(key, value.toString());
      } else {
        searchParams.delete(key);
      }
    });
  }

  if (remove) {
    remove.forEach((key) => searchParams.delete(key));
  }

  const updatedUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
  return updatedUrl;
};
