import React from "react";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface IEmployeeEtcPageTitleProps {
  title: string;
  className?: string;
}

const EmployeeEtcPageTitle = ({ title, className }: IEmployeeEtcPageTitleProps) => {
  const navigate = useNavigate();

  return (
    <div className={twMerge("mb-4 flex items-center gap-2", className)}>
      <Button
        size="icon"
        onClick={() => navigate(-1)}
        aria-label="뒤로 가기"
        className="bg-white-bg text-muted-foreground hover:text-foreground dark:bg-dark-bg"
      >
        <ChevronLeft className="h-16 w-16" />
      </Button>
      <h1 className="text-lg font-bold">{title}</h1>
    </div>
  );
};

export default EmployeeEtcPageTitle;
