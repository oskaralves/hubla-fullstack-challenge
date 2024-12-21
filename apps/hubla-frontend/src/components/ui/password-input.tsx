"use client";

import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCycle } from "framer-motion";
import { ViewIcon, ViewOffIcon } from "hugeicons-react";
import { forwardRef } from "react";

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, toggleShowPassword] = useCycle(false, true);
    const disabled =
      props.value === "" || props.value === undefined || props.disabled;
    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("hide-password-toggle pr-10", className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => toggleShowPassword()}
          disabled={disabled}
        >
          {showPassword && !disabled ? (
            <ViewIcon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <ViewOffIcon className="h-5 w-5" aria-hidden="true" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";
export { PasswordInput };
