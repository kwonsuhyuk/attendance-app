import * as React from "react";

import { cn } from "@/util/cn.util";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="mx-auto w-full max-w-[500px]">
        <input
          type={type}
          className={cn(
            // "flex h-12 w-full rounded-lg bg-background p-2 px-0 py-2 text-base",
            "flex h-12 w-full rounded-lg bg-background bg-white p-2 py-2 text-base",
            "border-[0px] border-slate-200",
            "shadow-[0_0_0_1px_rgba(0,0,0,0.2)]",
            "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
