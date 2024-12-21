"use client";

import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";

import { useDictionary } from "@/contexts/dictionary-context";
import { Search01Icon } from "hugeicons-react";
import { Loading } from "../ui/loading";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

export type DataTableToolbarFiltersProps<TData> = {
  id: TData;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
};

export type DataTableToolbarProps<TData> = {
  isLoading: boolean;
  searchTerm: string;
  table: Table<TData>;
  onResetFilters: () => void;
  onChangeSearch: (termSearch: string) => void;
  onFilterByColumn: (
    filters: {
      id: string;
      value: string | string[];
    }[]
  ) => void;
  filters?: {
    id: string;
    title: string;
    options: { value: string; label: string }[];
  }[];
};

export function DataTableToolbar<TData>({
  isLoading,
  searchTerm,
  table,
  onResetFilters,
  onChangeSearch,
  onFilterByColumn,
  filters,
}: DataTableToolbarProps<TData>) {
  const {
    general: { SEARCH },
  } = useDictionary();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-4">
        <div className="relative">
          <Input
            placeholder={SEARCH}
            startIcon={
              <Search01Icon
                size={18}
                className="pointer-events-none text-foreground/50"
              />
            }
            value={searchTerm}
            onChange={(event) => onChangeSearch(event.target.value || "")}
            className="w-36 bg-background pl-9 md:w-48 lg:w-60"
          />
        </div>

        {filters?.map(({ id, title, options }) => {
          return (
            <DataTableFacetedFilter
              key={`filter-${id}-${title}`}
              columnFilters={table.getState().columnFilters}
              id={id}
              title={title}
              options={options}
              onFilterByColumn={onFilterByColumn}
            />
          );
        })}

        <div className="pointer-events-none">
          <Loading isLoading={isLoading} variant="outline" />
        </div>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
