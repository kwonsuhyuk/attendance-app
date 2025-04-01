import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface ICompanyInfo {
  companyLogo: string | undefined;
  companyName: string | undefined;
  companyIntro: string | undefined;
}
const CompanyInfo = ({ companyLogo, companyName, companyIntro }: ICompanyInfo) => {
  return (
    <Card className="rounded-xl bg-white p-6 shadow-md">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarFallback>
            <img src={companyLogo} alt="logo" className="h-16 w-16" />
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xl font-semibold text-black">{companyName}</p>
          <p className="mt-1 text-sm text-gray-500">{companyIntro}</p>
        </div>
      </div>
    </Card>
  );
};

export default CompanyInfo;
