import React from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/util/cn.util";
import useDarkMode from "@/store/darkmode.store";
import { useShallow } from "zustand/shallow";
import { DarkModeSwitch } from "@/components/ui/switch";

const DarkmodeSwitch = ({ className }: { className?: string }) => {
  const { toggleMode, darkMode } = useDarkMode(
    useShallow(state => ({
      toggleMode: state.toggleMode,
      darkMode: state.darkMode,
    })),
  );

  return (
    <DarkModeSwitch checked={darkMode} onCheckedChange={toggleMode} className={className}>
      {darkMode ? (
        <Moon className={cn("absolute text-yellow-300")} size={18} fill="yellow" />
      ) : (
        <Sun
          className={cn("absolute text-orange-400 opacity-0", "opacity-100 dark:opacity-0")}
          size={18}
        />
      )}
    </DarkModeSwitch>
  );
};

export default DarkmodeSwitch;
