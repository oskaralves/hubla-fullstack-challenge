import { ListReactTable } from "@/components/react-table";
import { PagedResponse } from "@/types/paged-response";
import { ColumnDef } from "@tanstack/react-table";

type DataTableSkeletonProps<T = any> = {
  columns: ColumnDef<T>[];
  totalRows?: number;
};

export const DataTableSkeleton = ({
  columns,
  totalRows = 10,
}: DataTableSkeletonProps) => {
  const rows = Array.from({ length: totalRows });
  const data: PagedResponse<any> = {
    rows,
    totalRows,
    totalPages: 1,
    currentPage: 1,
    countRows: totalRows,
  };

  return <ListReactTable isPending data={data} columns={columns} />;
};
