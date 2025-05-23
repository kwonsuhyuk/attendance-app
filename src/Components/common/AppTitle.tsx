import { twMerge } from "tailwind-merge";

interface AppTitleProps {
  className?: string;
}

const AppTitle = ({ className }: AppTitleProps) => {
  return (
    <h2
      className={twMerge(
        "relative inline-block text-3xl font-bold tracking-tight text-zinc-800 dark:text-white md:text-4xl",
        className,
      )}
    >
      <span className="relative font-sans after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-point-color after:transition-all after:duration-300 hover:after:w-full">
        On & Off
      </span>
    </h2>
  );
};

export default AppTitle;
