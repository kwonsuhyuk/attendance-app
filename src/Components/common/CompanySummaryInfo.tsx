import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { twMerge } from "tailwind-merge";
import { useUserStore } from "@/store/user.store";
import { stat } from "fs";

interface ICompanySummaryInfoProps {
  companyLogo: string | undefined;
  companyName: string | undefined;
  type?: "employee" | "manager";
  className?: string;
}

const CompanySummaryInfo = ({
  companyLogo,
  companyName,
  type = "manager",
  className,
}: ICompanySummaryInfoProps) => {
  const name = useUserStore(state => state.currentUser?.name);
  const jobName = useUserStore(state => state.currentUser?.jobName);
  const workType = useUserStore(state => state.currentUser?.employmentType);

  return (
    <div
      className={twMerge(
        "m-4 flex items-center gap-4 rounded-md bg-point-color px-4 py-3",
        className,
      )}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={companyLogo} alt="회사 로고" />
        <AvatarFallback className="text-sm">{companyName?.charAt(0) ?? "C"}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col text-sm text-white-text">
        <span className="max-w-[160px] truncate text-base font-bold">{companyName}</span>

        <span className="text-xs text-gray-700">
          {name} ・ {type === "manager" ? "관리자" : `${jobName} ・ ${workType}`}
        </span>
      </div>
    </div>
  );
};

export default CompanySummaryInfo;
