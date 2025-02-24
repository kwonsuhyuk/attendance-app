import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-16 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-100",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none flex items-center justify-center h-8 w-8 rounded-full bg-white dark:bg-background shadow-lg ring-0 transition-transform",
        "data-[state=checked]:translate-x-7 data-[state=unchecked]:-translate-x-3",
      )}
    >
      <Sun
        className={cn("absolute text-orange-400 opacity-0", "dark:opacity-0 opacity-100")}
        size={22}
      />
      <Moon
        className={cn("absolute text-white opacity-0", "dark:opacity-100 opacity-0")}
        size={22}
      />
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
