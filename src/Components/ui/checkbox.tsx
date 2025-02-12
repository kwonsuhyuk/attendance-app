import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-5 w-5 shrink-0 rounded border border-primary ring-offset-background",
      "focus-visible:outline-none focus-visible:ring-2 focus-ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:border-primary relative", // relative 추가
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current absolute inset-0")} // absolute와 inset-0 추가
    >
      {/* SVG를 직접 작성하여 체크박스를 꽉 채우도록 함 */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
        strokeWidth="5"
        className="w-full h-full p-0.5" // padding으로 약간의 여백 추가
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
