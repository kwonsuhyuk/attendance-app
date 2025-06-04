import { ReactNode } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/util/cn.util";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  onSubmit?: () => void | Promise<void>;
  submitLabel?: string;
  submitDisabled?: boolean;
  maxWidthClass?: string;
  titleAlign?: "left" | "center";
}

const RegisterModal = ({
  open,
  onClose,
  title,
  icon,
  subtitle,
  children,
  maxWidthClass = "max-w-md",
  onSubmit,
  submitLabel,
  submitDisabled = false, // 기본값 false
  titleAlign = "center",
}: RegisterModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={`w-[90vw] ${maxWidthClass} overflow-y-auto dark:border dark:border-dark-border`}
      >
        <DialogHeader>
          <DialogTitle
            className={cn(
              "flex items-center justify-center gap-3 text-lg font-bold dark:text-white-text md:text-xl",
              titleAlign === "center" ? "justify-center" : "justify-start",
            )}
          >
            {icon}
            {title}
            {subtitle && titleAlign === "left" && (
              <span className="text-sm font-semibold md:text-base">{subtitle}</span>
            )}
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-6 top-9 rounded-md border-none bg-transparent text-gray-500 hover:text-gray-700 dark:text-white-text dark:hover:bg-dark-border dark:hover:bg-white-bg"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </DialogHeader>

        <div className="mt-3 grid gap-6">{children}</div>

        {onSubmit && (
          <DialogFooter>
            <Button
              type="button"
              onClick={onSubmit}
              disabled={submitDisabled}
              className="mt-4 w-full dark:bg-dark-bg dark:text-dark-text"
            >
              {submitLabel || "등록"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
