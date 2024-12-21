"use client";

import { Locale, useLanguage } from "@/contexts/language-context";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const LanguageSwitcher = () => {
  const { isPending, locale, setLocale } = useLanguage();

  const CurrentFlagIcon = ({
    locale,
    size = 38,
  }: {
    locale: Locale;
    size?: number;
  }) => {
    // svg flags https://lineicons.com/free-icons/circle-flags
    switch (locale) {
      case "pt-BR":
        return (
          <Image
            src="/svgs/flags/pt-br.svg"
            alt="pt-BR"
            width={size}
            height={size}
            unoptimized
            style={{ objectFit: "contain", margin: -4 }}
          />
        );
      case "en-US":
        return (
          <Image
            src="/svgs/flags/en-us.svg"
            alt="en-US"
            width={size}
            height={size}
            unoptimized
            style={{ objectFit: "contain", margin: -4 }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline-hover"
          isLoading={isPending}
          className="relative flex h-10 min-w-10 flex-row items-center justify-center border-transparent p-0 hover:border hover:border-primary"
        >
          <CurrentFlagIcon locale={locale} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLocale("pt-BR")}>
          <CurrentFlagIcon locale="pt-BR" />
          Português (BR)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale("en-US")}>
          <CurrentFlagIcon locale="en-US" />
          English (US)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
