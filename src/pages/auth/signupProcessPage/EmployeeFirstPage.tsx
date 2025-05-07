import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Loading from "@/components/common/Loading";
import { useCompanyStore } from "@/store/company.store";
import { useShallow } from "zustand/shallow";
import { TJob } from "@/model/types/company.type";
import { Separator } from "@/components/ui/separator";
import UserInfoTable from "@/components/auth/UserInfoTable";
import { useSettingEmployee } from "@/hooks/auth/useSettingEmployee";
import CompanyInfo from "@/components/common/CompanyInfo";
import AppTitle from "@/components/common/AppTitle";
import EmployeeJobSelection from "@/components/employee/EmployeeJobSelection";
import EmploymentTypeSelection from "@/components/employee/EmployeementTypeSelection";
import { Label } from "@/components/ui/label";

export default function EmployeeFirstPage() {
  const {
    loading,
    handleGoMain,
    name,
    email,
    phoneNumber,
    selectJob,
    setSelectJob,
    employmentType,
    setEmploymentType,
  } = useSettingEmployee();
  const { companyName, jobList, companyLogo, companyIntro } = useCompanyStore(
    useShallow(state => ({
      companyName: state.currentCompany?.companyName,
      companyLogo: state.currentCompany?.companyLogo,
      jobList: state.currentCompany?.jobList,
      companyIntro: state.currentCompany?.companyIntro,
    })),
  );

  if (loading) return <Loading />;

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-4 sm:p-6">
      <div className="flex w-full max-w-md flex-1 flex-col gap-6 sm:max-w-sm">
        {/* Title */}
        <AppTitle />
        <CompanyInfo
          companyName={companyName}
          companyLogo={companyLogo}
          companyIntro={companyIntro}
        />
        {/* Job Selection Section */}
        <Card className="mb-10 flex flex-1 flex-col space-y-6 rounded-xl bg-white p-6 shadow-md">
          <Label className="text-lg text-black">가입 정보</Label>
          {/* 사용자 정보 */}
          <UserInfoTable
            className="my-4"
            rows={[
              { label: "이름", value: name! },
              { label: "이메일", value: email! },
              { label: "전화번호", value: phoneNumber! },
            ]}
          />
          <Separator />
          <EmployeeJobSelection
            jobList={jobList as TJob[]}
            selectJob={selectJob}
            setSelectJob={setSelectJob}
          />
          <Separator />
          <EmploymentTypeSelection
            employmentType={employmentType}
            setEmploymentType={setEmploymentType}
          />
        </Card>
      </div>
      <div className="sm-max-w-sm w-full max-w-md pb-6">
        <Button onClick={handleGoMain} className="w-full py-3 text-lg font-semibold">
          가입 완료
        </Button>
      </div>
    </div>
  );
}
