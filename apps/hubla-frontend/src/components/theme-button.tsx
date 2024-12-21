"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle Dark Mode"
          type="button"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {resolvedTheme === "dark" ? (
            <SunIcon className="h-5 w-5 text-orange-300" />
          ) : (
            <MoonIcon className="h-5 w-5 text-slate-800" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="" side="top">
        Mudar para {resolvedTheme === "dark" ? "light" : "dark"}
      </TooltipContent>
    </Tooltip>
  );
};
