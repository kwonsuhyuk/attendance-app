import { Moon, Sun } from "lucide-react";
import { cn } from "@/util/cn.util";
import { useShallow } from "zustand/shallow";
import useDarkMode from "@/store/darkmode.store";

const DarkmodeToggle = ({ className }: { className?: string }) => {
  const { toggleMode, darkMode } = useDarkMode(
    useShallow(state => ({
      toggleMode: state.toggleMode,
      darkMode: state.darkMode,
    })),
  );

  return (
    <button onClick={toggleMode} className={cn("p-1", className)}>
      {darkMode ? (
        <Sun className="text-orange-400" size={20} />
      ) : (
        <Moon className="text-yellow-300" size={20} />
      )}
    </button>
  );
};

export default DarkmodeToggle;
