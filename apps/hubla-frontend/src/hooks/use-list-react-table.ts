import { DEFAULT_ITEMS_PER_PAGE } from "@/constants";
import { PagedResponse } from "@/types/paged-response";
import { useDebounce } from "@/utils/debounce";
import { updateUrlParams } from "@/utils/url";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  SortingState,
  TableOptions,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
interface UseListReactTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: PagedResponse<TData>;
  filterableColumns?: string[];
  options?: TableOptions<TData>;
}

export function useListReactTable<TData>({
  columns,
  data,
  filterableColumns = [],
  options,
}: UseListReactTableProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const searchParam = params.get("search") || "";
  const pageParam = params.get("page") || "1";
  const perPageParam = params.get("per_page") || String(DEFAULT_ITEMS_PER_PAGE);
  const sortParam = params.get("sort") || "";

  const page = Math.max(1, parseInt(pageParam ?? "1"));
  const pageIndex =
    page > Number(data?.totalPages) ? Number(data.totalPages) - 1 : page - 1;
  const pageSize = parseInt(perPageParam) || DEFAULT_ITEMS_PER_PAGE;

  const sortArray = sortParam
    .split(",")
    .map((s) => {
      const [id, desc] = s.split(":");
      if (id && (desc === "asc" || desc === "desc")) {
        return { id, desc: desc === "desc" };
      }
      return null;
    })
    .filter(Boolean) as SortingState;

  const initialFilters = Array.from(params.entries()).reduce(
    (acc, [key, value]) => {
      if (
        key !== "page" &&
        key !== "per_page" &&
        key !== "sort" &&
        key !== "search"
      ) {
        acc.push({ id: key, value: value.split(",") });
      }
      return acc;
    },
    [] as ColumnFiltersState
  );
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(initialFilters);

  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParam || "");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>(sortArray);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex,
    pageSize,
  });

  const handleDebouncedSearch = useCallback(
    (debouncedValue: string) => {
      let pageReset = undefined;

      if (debouncedValue.length) {
        setPagination({ pageIndex: 0, pageSize });
        pageReset =
          debouncedValue.length && params.get("page")
            ? { page: page !== 1 ? 1 : page }
            : {};
      }
      router.push(
        updateUrlParams({
          pathname,
          currentParams: params.toString(),
          params: {
            search: encodeURIComponent(debouncedValue),
            ...pageReset,
          },
        })
      );
    },
    [page, pageSize, params, pathname, router]
  );

  useDebounce(searchTerm, 500, handleDebouncedSearch) || "";

  const table = useReactTable({
    data: data.rows ?? [],
    columns,
    pageCount: data.totalPages,
    state: {
      pagination,
      sorting,
      columnVisibility,
      columnFilters,
      rowSelection,
    },
    defaultColumn: {
      size: 200, //starting column size
      minSize: 50, //enforced during column resizing
      maxSize: 500, //enforced during column resizing
    },
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    enableMultiSort: true,
    enableRowSelection: true,
    enableMultiRowSelection: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    columnResizeMode: "onChange",
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    ...options,
  });

  const handleResetFilter = useCallback(() => {
    setSearchTerm("");
    table.resetColumnFilters();
    table.resetSorting();
    router.push(pathname);
  }, [pathname, router, table]);

  const handleChangeSearch = useCallback((term: string) => {
    setIsLoading(true);
    setSearchTerm(term);
  }, []);

  const handleFilterByColumn = useCallback(
    (filters: { id: string; value: string | string[] }[]) => {
      setIsLoading(true);
      filters.forEach(({ id, value }) => {
        table.getColumn(id)?.setFilterValue(value);
      });
    },
    [table]
  );

  useEffect(() => {
    setIsLoading(true);

    const pageCurrent = pagination.pageIndex + 1;
    const pageSize = pagination.pageSize;

    const newParams: Record<string, string | number> = {
      page: pageCurrent,
      per_page: pageSize,
    };

    const updatedUrl = updateUrlParams({
      pathname,
      currentParams: params.toString(),
      params: newParams,
    });
    if (params.toString() !== updatedUrl.split("?")[1]) {
      router.push(updatedUrl);
    }
  }, [pagination.pageIndex, pagination.pageSize, params, pathname, router]);

  useEffect(() => {
    const pageCurrentParam = Number(params.get("page"));
    const currentPerPage = Number(params.get("per_page"));

    if (pageCurrentParam === 0 || currentPerPage === 0) {
      setPagination({ pageIndex: 0, pageSize: DEFAULT_ITEMS_PER_PAGE });
    }
  }, [params]);

  useEffect(() => {
    const sortingField = sorting
      .map(({ id, desc }) => `${id}:${desc ? "desc" : "asc"}`)
      .join(",");

    if (sortingField.length || params.get("sort")) {
      const newParams: Record<string, string | number> = {
        sort: sortingField,
      };

      if (params.get("sort") !== newParams.sort) {
        setIsLoading(true);

        const updatedUrl = updateUrlParams({
          pathname,
          currentParams: params.toString(),
          params: newParams,
        });

        router.push(updatedUrl);
      }
    }
  }, [params, pathname, router, sorting]);

  useEffect(() => {
    const newParams: Record<string, string | number> = filterableColumns.reduce(
      (acc, key) => {
        acc[key] = "";
        return acc;
      },
      {} as Record<string, string | number>
    );

    columnFilters.forEach(({ id, value }: { id: string; value: any }) => {
      newParams[id] = Array.isArray(value) ? value.join(",") : value || "";
    });

    const hasFilterableColumnsInParams = filterableColumns.some((column) =>
      params.get(column)
    );

    if (columnFilters.length || hasFilterableColumnsInParams) {
      const updatedUrl = updateUrlParams({
        pathname,
        currentParams: params.toString(),
        params: newParams,
      });

      router.push(updatedUrl);
    }
  }, [columnFilters, filterableColumns, params, pathname, router]);

  useEffect(() => {
    setIsLoading(false);
  }, [params]);

  return {
    isLoading,
    table,
    searchTerm,
    handleResetFilter,
    handleChangeSearch,
    handleFilterByColumn,
  };
}
