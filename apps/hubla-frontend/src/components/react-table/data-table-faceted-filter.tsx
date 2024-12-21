"use client";

import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ColumnFiltersState } from "@tanstack/react-table";
import { ComponentType, useCallback, useMemo } from "react";

interface DataTableFacetedFilterProps {
  id: string;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: ComponentType<{ className?: string }>;
  }[];
  columnFilters: ColumnFiltersState;
  onFilterByColumn: (
    filters: {
      id: string;
      value: string | string[];
    }[]
  ) => void;
}

export function DataTableFacetedFilter({
  id,
  title,
  options,
  columnFilters,
  onFilterByColumn,
}: DataTableFacetedFilterProps) {
  const filtersArray = useMemo(
    () =>
      columnFilters
        .filter((filter) => filter.id === id)
        .map(({ value }) => value as string)
        .flat(),
    [columnFilters, id]
  );

  const handleChangeOption = useCallback(
    (value: string | string[], isSelected: boolean) => {
      if (isSelected) {
        const values = {
          id,
          value: [...filtersArray.filter((item) => item !== value)],
        };
        onFilterByColumn([values]);
      } else {
        const values = { id, value: [...filtersArray].concat(value) };
        onFilterByColumn([values]);
      }
    },
    [filtersArray, id, onFilterByColumn]
  );

  const clearColumnFilters = useCallback(() => {
    onFilterByColumn([{ id, value: [] }]);
  }, [id, onFilterByColumn]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline-hover" className="border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
          {filtersArray?.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge className="mr-[-8px] flex min-w-5 items-center justify-center rounded-sm px-1 font-normal lg:hidden">
                {filtersArray.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {filtersArray.length > 2 ? (
                  <Badge className="mr-[-8px] rounded-sm px-1 font-normal">
                    {filtersArray.length} selecionados
                  </Badge>
                ) : (
                  options
                    .filter((option) => filtersArray.includes(option.value))
                    .map((option, index) => (
                      <Badge
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                        style={{
                          marginRight:
                            filtersArray.length - 1 === index ? "-8px" : "",
                        }}
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
              Opção não encontrada
            </CommandEmpty>
            <CommandGroup>
              {options?.map((option) => {
                const isSelected = filtersArray.includes(option.value);

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      handleChangeOption(option.value, isSelected);
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                    {/* {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )} */}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {filtersArray.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => clearColumnFilters()}
                    className="justify-center text-center"
                  >
                    Limpar filtros
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
