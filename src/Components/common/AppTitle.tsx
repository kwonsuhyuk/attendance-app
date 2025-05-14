import { Power } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface AppTitleProps {
  className?: string;
}

const AppTitle = ({ className }: AppTitleProps) => {
  return (
    <h2
      className={twMerge(
        "flex scroll-m-20 items-center gap-2 text-center text-2xl font-bold tracking-tight",
        className,
      )}
    >
      <Power className="h-8 w-8" />
      <span className="font-sans">On & Off</span>
    </h2>
  );
};

export default AppTitle;
