import { ReactNode } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  onSubmit: () => void | Promise<void>;
  submitLabel?: string;
  maxWidthClass?: string;
}

const RegisterModal = ({
  open,
  onClose,
  title,
  icon,
  children,
  maxWidthClass = "max-w-md",
}: RegisterModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={`w-[90vw] ${maxWidthClass} dark:border dark:border-dark-border`}>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 dark:text-white-text">
            {icon}
            {title}
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-7 rounded-md border-none bg-transparent text-gray-500 hover:text-gray-700 dark:text-white-text dark:hover:bg-dark-border dark:hover:bg-white-bg"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </DialogHeader>

        <div className="mt-4 grid gap-8">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
