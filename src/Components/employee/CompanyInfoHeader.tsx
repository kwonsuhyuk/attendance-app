import { useCompanyStore } from "@/store/company.store";
import { useUserStore } from "@/store/user.store";
import React from "react";

const CompanyInfoHeader = () => {
  const companyLogo = useCompanyStore(state => state.currentCompany?.companyLogo);
  const companyName = useCompanyStore(state => state.currentCompany?.companyName);
  const name = useUserStore(state => state.currentUser?.name);
  const jobName = useUserStore(state => state.currentUser?.jobName);

  return (
    <div className="flex flex-col items-center gap-4">
      <img
        src={companyLogo || "/placeholder.svg"}
        alt="회사로고"
        className="h-[130px] w-[130px] rounded-full"
      />
      <div className="font-black">{companyName}</div>
      <div className="flex items-center">
        {name}/{jobName}
      </div>
    </div>
  );
};

export default CompanyInfoHeader;
