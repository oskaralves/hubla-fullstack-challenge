"use client";

import { DataTableColumnHeader } from "@/components/react-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useDictionary } from "@/contexts/dictionary-context";
import { Transaction } from "@/types/transaction";
import { currencyFormatter } from "@/utils/currency";

import { formatData } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";
import { RemoveSquareIcon } from "hugeicons-react";
import { PlusSquareIcon } from "lucide-react";

export const useTransactionListColumns = () => {
  const {
    field: { PRODUCT, DATE, TYPE, SELLER, VALUE },
  } = useDictionary();

  const columns: ColumnDef<Transaction>[] = [
    {
      id: "transaction.nature",
      size: 20,
      maxSize: 20,
      minSize: 20,
      enableResizing: false,
      meta: {
        loading: (
          <Skeleton className="size-5 max-h-5 min-h-5 min-w-5 max-w-5 rounded-sm bg-slate-300/40 dark:bg-slate-300/20" />
        ),
      },
      cell: ({ row }) =>
        row?.original?.transactionType.nature === "INCOME" ? (
          <PlusSquareIcon className="size-5 text-emerald-500" />
        ) : (
          <RemoveSquareIcon className="size-5 text-red-500" />
        ),
    },
    {
      accessorKey: "value",
      enableResizing: true,
      size: 100,
      maxSize: 100,
      minSize: 100,
      meta: {
        title: VALUE,
        loading: (
          <Skeleton className="h-6 w-24 rounded bg-slate-300/40 dark:bg-slate-300/20" />
        ),
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={VALUE} />
      ),
      cell: ({ row }) => (
        <div className="text-right">
          {currencyFormatter(row?.original?.value)}
        </div>
      ),
    },
    {
      accessorKey: "date",
      size: 100,
      maxSize: 100,
      minSize: 100,
      meta: {
        title: DATE,
        loading: (
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-20 rounded bg-slate-300/40 dark:bg-slate-300/20" />
            <Skeleton className="h-4 w-16 rounded bg-slate-300/40 dark:bg-slate-300/20" />
          </div>
        ),
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={DATE} />
      ),
      cell: ({ row }) => {
        {
          return formatData(row?.original?.date, {
            formatIn: "YYYY/MM/DD HH:mm:ss",
            formatOut: "DD/MM/YYYY HH:mm:ss",
          });
        }
      },
    },
    {
      accessorKey: "product",
      enableResizing: true,
      size: "25%" as unknown as number,
      maxSize: "25%" as unknown as number,
      minSize: "25%" as unknown as number,
      meta: {
        title: PRODUCT,
        loading: (
          <Skeleton className="h-6 w-32 rounded bg-slate-300/40 dark:bg-slate-300/20" />
        ),
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={PRODUCT} />
      ),
    },
    {
      accessorKey: "seller",
      enableResizing: true,
      enableSorting: true,
      size: "25%" as unknown as number,
      maxSize: "25%" as unknown as number,
      minSize: "25%" as unknown as number,
      meta: {
        title: SELLER,
        loading: (
          <Skeleton className="h-6 w-32 rounded bg-slate-300/40 dark:bg-slate-300/20" />
        ),
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={SELLER} />
      ),
    },
    {
      accessorKey: "transactionTypes",
      enableResizing: true,
      size: "25%" as unknown as number,
      maxSize: "25%" as unknown as number,
      minSize: "25%" as unknown as number,
      meta: {
        title: TYPE,
        loading: (
          <Skeleton className="h-6 w-24 rounded bg-slate-300/40 dark:bg-slate-300/20" />
        ),
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={TYPE} />
      ),
      cell: ({ row }) => (
        <div>
          <Badge variant="default" className="gap-1">
            {row?.original?.transactionType.description}
          </Badge>
        </div>
      ),
    },
  ];
  return columns;
};
