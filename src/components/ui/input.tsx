"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

const inputVariants = cva(
  "flex w-full rounded-md border bg-background text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400 placeholder:font-normal disabled:cursor-not-allowed disabled:opacity-50 placeholder:font-mono  focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
  {
    variants: {
      variant: {
        default: "border-gray-200",
        error: "border-red-500",
        success: "border-emerald-500",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-8 px-2 py-1 text-sm",
        lg: "h-12 px-4 py-3",
        custom: "h-[46px] w-[347px] px-[10px] py-[10px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, size, ...props }, ref) => {
    const [show, setShow] = React.useState(false);

    if (type !== "password") {
      return (
        <input
          type={type}
          className={cn(inputVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      );
    }

    return (
      <div className="relative w-full">
        <input
          type={show ? "text" : "password"}
          className={cn(inputVariants({ variant, size, className }), "pr-10")}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute inset-y-0 right-2 flex items-center text-gray-400 "
          tabIndex={-1}
        >
          {show ? (
            <EyeOff className="h-[18px] w-[18px]" />
          ) : (
            <Eye className="h-[18px] w-[18px]" />
          )}
        </button>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
