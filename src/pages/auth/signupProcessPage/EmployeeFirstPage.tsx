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
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gray-50">
      <div className="flex flex-col gap-6 w-full max-w-md sm:max-w-sm flex-1">
        {/* Title */}
        <AppTitle />
        <CompanyInfo
          companyName={companyName}
          companyLogo={companyLogo}
          companyIntro={companyIntro}
        />
        {/* Job Selection Section */}
        <Card className="p-6 rounded-xl bg-white flex flex-col space-y-6 shadow-md flex-1 mb-10">
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
      <div className="w-full max-w-md sm-max-w-sm pb-6">
        <Button
          onClick={handleGoMain}
          className="w-full py-3 text-lg font-semibold"
          variant="secondary"
        >
          가입 완료
        </Button>
      </div>
    </div>
  );
}
