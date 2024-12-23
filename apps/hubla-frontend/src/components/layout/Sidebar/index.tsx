"use client";

import { useAppContext } from "@/contexts/AppContext";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";
import { getNavigation } from "@/navigation";
import { Session } from "next-auth";
import { ReactNode } from "react";
import { MenuItem } from "./MenuItem";

export type SidebarProps = {
  user: Session["user"];
  children: ReactNode;
};

export const Sidebar = ({ user, children }: SidebarProps) => {
  const { sidebarExpanded } = useAppContext();
  const { locale } = useLanguage();
  const navigation = getNavigation(locale);
  return (
    <aside
      className={cn(
        "hidden min-h-full flex-col gap-3 transition-all md:flex",
        sidebarExpanded ? "w-[246px]" : "w-[70px]"
      )}
    >
      <nav className="flex h-full flex-col">
        <ul className="scrollbar-width-none flex h-full min-w-[30px] flex-1 flex-col overflow-y-auto pb-4">
          {navigation.items.map((item, idx) => (
            <MenuItem key={`menu-item--${item.title}-${idx}`} item={item} />
          ))}
        </ul>
        {children}
      </nav>
    </aside>
  );
};
