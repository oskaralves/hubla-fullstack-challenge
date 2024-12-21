import { TooltipContent } from "@/components/ui/tooltip";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItemProps } from "./types";

export const MenuItemSimple = ({ item, className }: MenuItemProps) => {
  const pathname = usePathname();
  const { sidebarExpanded } = useAppContext();

  const isActive = pathname === item.url;

  return (
    <li className="relative">
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link
            href={item.url as string}
            className={cn(
              `group mx-1 flex min-w-[44px] flex-row items-center space-x-2 rounded-lg p-3 transition-all hover:bg-neutral-500/10`,
              {
                "bg-primary/10 hover:bg-primary/10": isActive,
              },
              className
            )}
          >
            <div
              className={cn(
                `items-center justify-center transition-all group-hover:scale-[1.2]`,
                {
                  "text-primary": isActive,
                }
              )}
            >
              {item.icon}
            </div>
            <span
              className={cn(
                `overflow-hidden text-ellipsis text-nowrap text-sm font-semibold text-foreground/90`,
                { "text-primary": isActive }
              )}
            >
              {item.title}
            </span>
          </Link>
        </TooltipTrigger>
        <TooltipContent
          className={cn("ml-5 hidden font-semibold", {
            "md:flex": !sidebarExpanded,
          })}
          side="right"
        >
          {item.title}
        </TooltipContent>
      </Tooltip>
    </li>
  );
};
