"use client";

//import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EllipsisIcon } from "lucide-react";
import Link from "next/link";
import { Fragment, ReactNode } from "react";

export type DeleteConfig = {
  title: ReactNode;
  description: ReactNode;
};
type DataTableRowActionsProps<TData = any> = {
  id?: string;
  title?: ReactNode;
  row?: TData;
  actions?: {
    id: string | number;
    icon?: ReactNode;
    href?: string;
    label: ReactNode;
    separator?: boolean;
    onClick?: () => void;
  }[];
  children?: ReactNode;
};
export function DataTableRowActions({
  id,
  title = "Ações",
  actions = [],
  children,
}: DataTableRowActionsProps) {
  if (!actions.length) {
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="link"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              >
                <EllipsisIcon className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>

          <TooltipContent className="" side="left">
            {title}
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent id={id} align="end" className="w-[160px]">
          {actions.map(
            ({ id, label, icon, separator, href, onClick }, index) =>
              href ? (
                <Link key={`dropdown-item-${id}`} href={href}>
                  <DropdownMenuItem className="space-x-2">
                    {icon}
                    <span>{label}</span>
                  </DropdownMenuItem>
                </Link>
              ) : (
                <Fragment key={`dropdown-item-${id}`}>
                  <DropdownMenuItem onClick={onClick} className="space-x-2">
                    {icon}
                    <span>{label}</span>
                  </DropdownMenuItem>
                  {separator && actions.length - 1 !== index ? (
                    <DropdownMenuSeparator />
                  ) : null}
                </Fragment>
              )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {children}
    </>
  );
}
