import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const loadingVariants = cva(
  "transform-none opacity-100 transition-all duration-500 ease-in-out vertical-align-middle transform-origin-center animate-rotate",
  {
    variants: {
      variant: {
        default: "stroke-white",
        destructive: "stroke-white",
        outline: "stroke-primary",
        "outline-hover": "stroke-primary",
        secondary: "stroke-white",
        ghost: "stroke-primary",
        link: "stroke-primary",
        icon: "stroke-primary",
      },
      size: {
        default: "h-4 w-4",
        sm: "h-3 w-3",
        icon: "h-4 w-4",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface LoadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  isLoading?: boolean;
}

const Loading = ({ isLoading, variant, size, className }: LoadingProps) => {
  if (!isLoading) return null;

  return (
    <div className="app-loading flex h-full w-full items-center justify-center">
      <div className={cn(loadingVariants({ variant, size, className }))}>
        <svg viewBox="25 25 50 50" strokeWidth="5" className="animate-spin">
          <circle
            className="stroke stroke-linecap-round animate-stretch fill-none"
            cx="50"
            cy="50"
            r="20"
          />
        </svg>
      </div>
    </div>
  );
};

export { Loading };
