import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { Loading } from "@/components/ui/loading";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-80 transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-primary text-primary font-medium",
        "outline-hover":
          "border border-primary text-primary border-border bg-background/5 font-medium hover:border-primary hover:bg-background/10",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        ghost: "text-primary hover:text-primary/80 hover:bg-primary/10",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "flex items-center gap-2 border bg-background p-2 transition-colors hover:border-primary",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-12 px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  labelClassName?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      isLoading,
      disabled,
      startIcon,
      endIcon,
      children,
      labelClassName,
      title,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const classDisable = disabled ? "disabled:opacity-40" : "";

    const gapClass = cn(
      size === "default" && "gap-2",
      size === "sm" && "gap-1 -ml-1",
      size === "lg" && "gap-2 -ml-0.5",
      size === "icon" && ""
    );

    const ButtonContent = (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size: variant === "icon" ? "icon" : size,
          }),
          className,
          classDisable,
          gapClass
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        <>
          {!isLoading && startIcon && (
            <span className="flex items-center">{startIcon}</span>
          )}
          {isLoading ? (
            <Loading variant={variant} isLoading size={size} />
          ) : children ? (
            <span
              className={cn(
                "flex flex-1 items-center justify-center",
                labelClassName
              )}
            >
              {children}
            </span>
          ) : null}
          {!isLoading && endIcon && (
            <span className="flex items-center">{endIcon}</span>
          )}
        </>
      </Comp>
    );

    return title ? (
      <Tooltip>
        <TooltipTrigger asChild>{ButtonContent}</TooltipTrigger>
        <TooltipContent>{title}</TooltipContent>
      </Tooltip>
    ) : (
      ButtonContent
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
