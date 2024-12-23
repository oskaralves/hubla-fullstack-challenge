"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { APP_TITLE } from "../../constants";

export type AuthHeader = {
  title: string;
  subtitle?: string;
};

export const AuthHeader = ({ title, subtitle }: AuthHeader) => {
  const { resolvedTheme } = useTheme();
  const [logo, setLogo] = useState("/svgs/logo-hubla.svg");

  useEffect(() => {
    setLogo(
      resolvedTheme === "dark"
        ? "/svgs/logo-hubla-dark.svg"
        : "/svgs/logo-hubla.svg"
    );
  }, [resolvedTheme]);
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative h-16 w-[200px]">
        <Image
          src={logo}
          className="w-32 overflow-hidden transition-all"
          fill
          priority
          alt={APP_TITLE}
          unoptimized
        />
      </div>
      <h1 className="text-lg font-medium text-foreground">{title}</h1>
      {subtitle && <p className="text-sm text-foreground/80">{subtitle}</p>}
    </div>
  );
};
