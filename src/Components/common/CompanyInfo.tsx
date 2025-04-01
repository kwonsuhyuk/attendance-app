import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { twMerge } from "tailwind-merge";

interface ICompanyInfo {
  companyLogo: string | undefined;
  companyName: string | undefined;
  companyIntro: string | undefined;
  className?: string;
}
const CompanyInfo = ({ companyLogo, companyName, companyIntro, className }: ICompanyInfo) => {
  return (
    <Card className={twMerge("rounded-xl bg-white p-6 shadow-md", className)}>
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback>
            <img src={companyLogo} alt="logo" className="h-16 w-16" />
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xl font-semibold text-black dark:text-dark-text">{companyName}</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-dark-nav-text">{companyIntro}</p>
        </div>
      </div>
    </Card>
  );
};

export default CompanyInfo;
