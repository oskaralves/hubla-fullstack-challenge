import * as React from "react";

import { cn } from "@/lib/utils";
import { MaskNameType, masksMapper } from "@/utils/masks";
import { VariantProps, cva } from "class-variance-authority";
import { Loading } from "./loading";

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background/40 px-3 py-2 text-sm ring-offset-background transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "border-red-500 bg-red-50 text-red-900",
        success: "border-green-600 bg-green-50 text-green-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  maskName?: MaskNameType;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isLoading?: boolean;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      isLoading,
      startIcon,
      endIcon,
      type,
      variant,
      maskName,
      onChange,
      ...props
    },
    ref
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let formattedValue = event.target.value;

      if (maskName) {
        formattedValue = masksMapper[maskName]
          ? masksMapper[maskName](formattedValue)
          : formattedValue;
      }

      if (onChange) {
        event.target.value = formattedValue;
        onChange(event);
      }
    };

    return (
      <div className="relative w-full">
        {startIcon ? (
          <div className="absolute inset-y-0 left-2.5 flex items-center">
            {startIcon ?? null}
          </div>
        ) : null}
        <input
          type={type}
          className={cn(inputVariants({ variant }), className)}
          ref={ref}
          onChange={handleChange}
          {...props}
        />

        {endIcon || isLoading ? (
          <div className="absolute inset-y-0 right-2.5 flex items-center">
            {isLoading ? (
              <Loading
                isLoading={isLoading}
                variant="outline"
                className="size-5"
              />
            ) : (
              (endIcon ?? null)
            )}
          </div>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
