"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSonnerToast } from "@/components/ui/use-sonner-toast";
import { useDictionary } from "@/contexts/dictionary-context";
import { cn } from "@/lib/utils";
import { copyToClipboard } from "@/utils/copy-to-clipboard";
import { Copy02Icon } from "hugeicons-react";
import Link from "next/link";
import { Fragment, ReactNode } from "react";
import { ActionProps } from "./section-card";

export type SimpleInformation = {
  label?: string;
  value?: ReactNode;
  valueToClipboard?: string | null;
  endAction?: ActionProps[];
  className?: string;
  isPending?: boolean;
};

export const SimpleInformation = ({
  label,
  value,
  valueToClipboard,
  endAction,
  className,
  isPending,
}: SimpleInformation) => {
  const {
    general: { CLOSE, COPY, COPIED },
  } = useDictionary();
  const { showToast, closeToast } = useSonnerToast();

  const hasValue = !!value;

  const renderActionButton = (action: ActionProps) => {
    if (!action.onClick && !action.href) {
      const divElement = (
        <div
          className={cn(
            "flex h-8 min-w-8 items-center justify-center rounded-sm",
            action?.className
          )}
        >
          {action.render}
        </div>
      );

      return action.title ? (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{divElement}</TooltipTrigger>
          <TooltipContent side="top">{action.title}</TooltipContent>
        </Tooltip>
      ) : (
        divElement
      );
    }

    const button = action?.href ? (
      <Link href={action.href} target={action?.target}>
        <Button
          variant={action?.variant ?? "outline-hover"}
          size="sm"
          className={cn(
            "h-8 min-w-8 rounded-sm",
            { "p-0": action.title },
            action?.className
          )}
          onClick={action.onClick}
        >
          {action.render}
        </Button>
      </Link>
    ) : (
      <Button
        variant={action?.variant ?? "outline-hover"}
        size="sm"
        className={cn(
          "h-8 min-w-8 rounded-sm",
          { "p-0": action.title },
          action?.className
        )}
        onClick={action.onClick}
      >
        {action.render}
      </Button>
    );

    return action.title ? (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="top">{action.title}</TooltipContent>
      </Tooltip>
    ) : (
      button
    );
  };

  const handleCopy = async (value: string) => {
    copyToClipboard(value);

    const toastId = showToast({
      type: "normal",
      icon: <Copy02Icon className="h-5 w-5" />,
      title: `${label} ${COPIED}!`,
      description: valueToClipboard,
      closeButton: false,
      action: {
        label: CLOSE,
        onClick: () => closeToast(toastId),
      },
    });
  };

  return (
    <div
      className={cn(
        "grid grid-cols-[1fr_auto] items-center gap-2 rounded-sm bg-card-foreground/[2%] p-2 hover:bg-card-foreground/5",
        className
      )}
    >
      <div className="min-w-0 flex-1">
        {isPending ? (
          <Skeleton className="mb-2 h-3 w-[25%] rounded" />
        ) : (
          <h4 className="min-h-5 text-xs font-medium text-foreground/50">
            {label}
          </h4>
        )}

        <div className="block break-words text-sm font-semibold">
          {hasValue ? (
            <>
              {typeof value === "string" ? (
                <span
                  className="block break-words text-sm font-semibold"
                  dangerouslySetInnerHTML={{ __html: value }}
                />
              ) : (
                (value ?? "—")
              )}
            </>
          ) : (
            "—"
          )}
        </div>
      </div>
      <div className="flex flex-auto flex-row items-center gap-2">
        {endAction?.length ? (
          <div className="flex flex-auto flex-row items-center gap-2">
            {endAction.map((action, index) => (
              <Fragment key={`${action.id}-${index}`}>
                {renderActionButton(action)}
              </Fragment>
            ))}
          </div>
        ) : null}
        {valueToClipboard ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="outline-hover"
                startIcon={<Copy02Icon className="size-5" />}
                className="h-8 min-w-8 rounded-sm p-0 text-neutral-500 hover:text-primary"
                onClick={() => handleCopy(valueToClipboard)}
              ></Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              {COPY} {label}
            </TooltipContent>
          </Tooltip>
        ) : null}
      </div>
    </div>
  );
};
