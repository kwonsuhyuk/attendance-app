import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

interface IErrorProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  onRetry?: () => void;
  retryText?: string;
}

const Error = ({
  title = "문제가 발생했습니다.",
  description = "다시 시도해 주세요.",
  icon = <AlertTriangle className="h-8 w-8 text-red-500" />,
  onRetry,
  retryText = "다시 시도",
}: IErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-6 text-center text-sm dark:border-red-400/30 dark:bg-red-950/30 dark:text-red-200">
      <div className="flex items-center justify-center">{icon}</div>
      <p className="text-base font-semibold text-red-700 dark:text-red-200">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
      {onRetry && (
        <Button
          size="sm"
          variant="outline"
          className="mt-2 border-red-400 text-red-500 hover:bg-red-100 dark:border-red-400 dark:text-red-200 dark:hover:bg-red-900"
          onClick={onRetry}
        >
          {retryText}
        </Button>
      )}
    </div>
  );
};

export default Error;
