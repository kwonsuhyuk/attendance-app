import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface IDetailModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  maxWidthClass?: string;
}

const DetailModal = ({
  open,
  onClose,
  title,
  subtitle,
  icon,
  children,
  maxWidthClass = "max-w-lg",
}: IDetailModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={`w-[80vw] dark:bg-zinc-800 dark:text-white 사용${maxWidthClass}`}>
        <DialogHeader className="flex flex-col gap-2 pt-0 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <DialogTitle className="flex items-center gap-3 text-lg font-bold text-gray-900 dark:text-white md:text-xl">
              {title}
              {subtitle && (
                <span className="text-sm font-semibold text-vacation-dark-color dark:text-blue-400 md:text-base">
                  {subtitle}
                </span>
              )}
            </DialogTitle>
          </div>
          <DialogClose asChild>
            <button
              type="button"
              className="absolute right-3 top-3 rounded-sm bg-transparent p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-zinc-700 dark:hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogClose>
        </DialogHeader>

        <div className="mt-4 space-y-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;
