import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-8 w-full rounded-md bg-background px-8 py-2 text-base",
          "max-w-sm mx-auto",
          "border-[0px] border-slate-200",
          "shadow-[0_0_0_1px_rgba(0,0,0,0.1)]",
          "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
