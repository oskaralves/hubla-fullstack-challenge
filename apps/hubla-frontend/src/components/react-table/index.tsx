"use client";

import { ColumnDef, TableOptions, flexRender } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "@/components/react-table/data-table-pagination";
import { DataTableToolbar } from "@/components/react-table/data-table-toolbar";
import { useListReactTable } from "@/hooks/use-list-react-table";
import { cn } from "@/lib/utils";
import { PagedResponse } from "@/types/paged-response";
import { SearchIcon } from "lucide-react";
import { useDictionary } from "../../contexts/dictionary-context";
import { Skeleton } from "../ui/skeleton";

export type ListReactTableFiltersProps = {
  id: string;
  title: string;
  options: {
    label: string;
    value: string;
  }[];
};

type ListReactTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data?: PagedResponse<TData>;
  isPending?: boolean;
  filterableColumns?: string[];
  options?: TableOptions<TData>;
  filters?: ListReactTableFiltersProps[];
};

export function ListReactTable<TData, TValue>({
  columns,
  data = {},
  isPending,
  filterableColumns,
  options,
  filters,
}: ListReactTableProps<TData, TValue>) {
  const { NO_RECORDS_FOUND } = useDictionary().general;
  const {
    table,
    isLoading,
    searchTerm,
    handleResetFilter,
    handleChangeSearch,
    handleFilterByColumn,
  } = useListReactTable({
    columns,
    data,
    filterableColumns,
    options,
  });

  return (
    <div className="space-y-4">
      {isPending ? (
        <div className="flex flex-row justify-between gap-2">
          <div className="flex flex-row justify-start gap-4">
            <Skeleton className="h-10 w-36 bg-slate-300/40 pl-9 dark:bg-slate-300/20 md:w-48 lg:w-60" />
            <Skeleton className="h-10 w-24 bg-slate-300/40 dark:bg-slate-300/20" />
          </div>
          <Skeleton className="size-10 bg-slate-300/40 dark:bg-slate-300/20" />
        </div>
      ) : (
        <DataTableToolbar
          isLoading={isLoading}
          searchTerm={searchTerm}
          table={table}
          onResetFilters={handleResetFilter}
          onChangeSearch={handleChangeSearch}
          onFilterByColumn={handleFilterByColumn}
          filters={filters}
        />
      )}
      <div className="h-[calc(100vh-278px)] overflow-hidden rounded-md border bg-background">
        <div
          className={cn("h-[calc(100vh-280px)] overflow-y-auto", {
            "overflow-y-hidden": isPending || isLoading,
          })}
        >
          <Table className="relative border-collapse">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{
                          width: !isNaN(header.column.getSize())
                            ? header.column.getSize()
                            : undefined,
                        }}
                        className={cn(
                          "z-10 after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:-z-10 after:ml-0.5 after:border-b after:border-border after:bg-background after:content-['']",
                          {
                            "w-10": ["actions"].includes(header.id),
                          }
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {!!table?.getRowModel?.()?.rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        width={cell.column.columnDef.size}
                        // @ts-ignore
                        data-title={cell.column.columnDef.meta?.["title"]}
                        className={cn(
                          "block border-b border-b-border px-4 py-2 md:table-cell md:border-b-0",
                          {
                            "pr-0": ["image"].includes(cell.column.id),
                          }
                        )}
                      >
                        {isPending || isLoading
                          ? // @ts-ignore
                            cell.column.columnDef.meta?.["loading"]
                          : flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <SearchIcon className="mx-auto h-[90px] w-[90px] stroke-foreground opacity-25" />
                    {NO_RECORDS_FOUND}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {isPending ? (
        <div></div>
      ) : (
        <DataTablePagination table={table} totalRows={data.totalRows} />
      )}
    </div>
  );
}
