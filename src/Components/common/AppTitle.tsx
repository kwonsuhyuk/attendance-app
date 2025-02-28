import { Power } from "lucide-react";
import { cn } from "@/util/cn.util";

interface AppTitleProps {
  className?: string;
}

const AppTitle = ({ className }: AppTitleProps) => {
  return (
    <h2
      className={cn(
        "flex scroll-m-20 items-center gap-2 text-center text-2xl font-bold tracking-tight",
        className,
      )}
    >
      <Power className="h-8 w-8" />
      <span className="font-baseFont text-2xl">On & Off</span>
    </h2>
  );
};

export default AppTitle;
