import React from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/util/cn.util";
import useDarkMode from "@/store/darkmode.store";
import { useShallow } from "zustand/shallow";
import { Switch } from "@/components/ui/switch";

const DarkmodeSwitch = ({ className }: { className?: string }) => {
  const { toggleMode, darkMode } = useDarkMode(
    useShallow(state => ({
      toggleMode: state.toggleMode,
      darkMode: state.darkMode,
    })),
  );
  return (
    <Switch checked={darkMode} onCheckedChange={toggleMode} className={className}>
      <Sun
        className={cn("absolute text-orange-400 opacity-0", "opacity-100 dark:opacity-0")}
        size={18}
      />
      <Moon
        className={cn("absolute text-white opacity-0", "opacity-0 dark:opacity-100")}
        size={18}
      />
    </Switch>
  );
};

export default DarkmodeSwitch;
