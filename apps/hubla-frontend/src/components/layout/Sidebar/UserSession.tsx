"use client";

import { AppAvatar } from "@/components/app/app-avatar";
import { ThemeButton } from "@/components/theme-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, MoreVerticalIcon } from "lucide-react";
import { Session } from "next-auth";
import { useTheme } from "next-themes";
import { signoutAction } from "../../../actions/auth/signout-action";

type UserSessionProps = {
  id: string;
  user: Session["user"];
  isHeader?: boolean;
};

export const UserSession = ({ id, user, isHeader }: UserSessionProps) => {
  const { sidebarExpanded } = useAppContext();
  const { resolvedTheme } = useTheme();

  return (
    <div
      className={cn("flex transition-all md:border-t md:border-border md:p-3", {
        "md:hidden": isHeader,
      })}
    >
      <div className="flex w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "group/avatar relative flex h-auto w-full justify-start gap-4 overflow-hidden py-1 text-accent-foreground hover:text-accent-foreground md:gap-2 md:py-2",
                {
                  "rounded-lg bg-none px-1 md:px-2 md:hover:bg-foreground/10":
                    sidebarExpanded,
                },
                {
                  "bg-none px-[4px] hover:bg-transparent dark:bg-transparent":
                    !sidebarExpanded && !isHeader,
                },
                {
                  "bg-none py-1 hover:bg-transparent dark:bg-transparent":
                    isHeader,
                }
              )}
              startIcon={
                <AppAvatar
                  id={`avatar-${id}`}
                  imageUrl={undefined}
                  size={38}
                  strokeWidth={3}
                  className="fill-neutral-100"
                />
              }
            >
              {!isHeader ? (
                <div className="hidden flex-1 flex-col truncate text-left leading-4 md:flex">
                  <h4 className="font-semibold">{user.name}</h4>
                  <p className="leading-2 truncate text-xs font-normal opacity-50">
                    {user.email}
                  </p>
                </div>
              ) : (
                <ChevronDownIcon
                  size={16}
                  className="flex stroke-neutral-500 md:hidden"
                />
              )}

              {sidebarExpanded ? (
                <MoreVerticalIcon
                  size={20}
                  className="hidden stroke-neutral-500 md:flex"
                />
              ) : null}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-row items-center justify-between">
                <span>Tema: {resolvedTheme}</span>
                <ThemeButton />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={async () => signoutAction()}>
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
