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
        className="rounded-full w-[130px] h-[130px]"
      />
      <div className="font-black">{companyName}</div>
      <div className="flex items-center">
        {name}/{jobName}
      </div>
    </div>
  );
};

export default CompanyInfoHeader;
