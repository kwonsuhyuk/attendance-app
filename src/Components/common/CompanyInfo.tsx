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
    <Card className="p-6 rounded-xl bg-white shadow-md">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarFallback>
            <img src={companyLogo} alt="logo" className="w-16 h-16" />
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xl font-semibold text-black">{companyName}</p>
          <p className="text-gray-500 mt-1 text-sm">{companyIntro}</p>
        </div>
      </div>
    </Card>
  );
};

export default CompanyInfo;
