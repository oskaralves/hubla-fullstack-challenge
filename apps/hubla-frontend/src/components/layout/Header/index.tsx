"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import { menuItemIconProps } from "@/constants";
import { useAppContext } from "@/contexts/AppContext";
import { IndentDecreaseIcon, IndentIncreaseIcon } from "lucide-react";
import { Session } from "next-auth";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SidebarMobile } from "../HeaderMobile";
import { UserSession } from "../Sidebar/UserSession";

type HeaderProps = {
  user: Session["user"];
};

export function Header({ user }: HeaderProps) {
  const { resolvedTheme } = useTheme();
  const { sidebarExpanded, handleToggleSidebar } = useAppContext();
  const [logo, setLogo] = useState("/svgs/logo-hubla.svg");

  useEffect(() => {
    setLogo(
      resolvedTheme === "dark"
        ? "/svgs/logo-hubla-dark.svg"
        : "/svgs/logo-hubla.svg"
    );
  }, [resolvedTheme]);

  return (
    <header className="col-span-full flex h-[68px] items-center border border-transparent px-3 transition-all md:pr-6">
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex items-center justify-between gap-3">
          <Button
            onClick={() => handleToggleSidebar()}
            variant="secondary"
            className="hidden bg-transparent hover:bg-neutral-500/10 md:flex"
            size="icon"
          >
            {sidebarExpanded ? (
              <IndentDecreaseIcon
                {...menuItemIconProps}
                width={24}
                height={24}
                className="stroke-neutral-700 dark:stroke-neutral-400"
              />
            ) : (
              <IndentIncreaseIcon
                {...menuItemIconProps}
                width={24}
                height={24}
                className="stroke-neutral-700 dark:stroke-neutral-400"
              />
            )}
          </Button>

          <div className="relative h-14 w-[164px]">
            <Image
              src={logo}
              className="w-32 overflow-hidden transition-all"
              fill
              priority
              unoptimized
              alt="Logo Hubla"
            />
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <LanguageSwitcher />
          <UserSession user={user} isHeader id="header" />
          <SidebarMobile user={user} />
        </div>
      </div>
    </header>
  );
}
