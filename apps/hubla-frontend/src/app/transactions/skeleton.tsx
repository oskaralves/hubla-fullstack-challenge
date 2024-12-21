"use client";

import { DataTableSkeleton } from "@/components/react-table/data-table-skeleton";
import { useTransactionListColumns } from "./columns";

export const TransactionTableSkeleton = () => {
  const columns = useTransactionListColumns();

  return <DataTableSkeleton columns={columns} totalRows={10} />;
};
