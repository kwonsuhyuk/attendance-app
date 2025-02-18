import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Loading from "@/components/common/Loading";
import { useCompanyStore } from "@/store/company.store";
import { useUserStore } from "@/store/user.store";
import { useShallow } from "zustand/shallow";
import { TJob } from "@/model";
import { setEmployeeUser } from "@/api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Info } from "lucide-react";
import TooltipContainer from "@/components/common/TooltipContainer";
import { Separator } from "@/components/ui/separator";
import UserInfoTable from "@/components/auth/UserInfoTable";

export default function EmployeeFirstPage() {
  const { companyCode, userId, name, email, phoneNumber } = useUserStore(
    useShallow(state => ({
      companyCode: state.currentUser?.companyCode,
      userId: state.currentUser?.uid,
      name: state.currentUser?.name,
      email: state.currentUser?.email,
      phoneNumber: state.currentUser?.phoneNumber,
    })),
  );
  const {
    companyName,
    jobName: jobList,
    companyLogo,
    companyIntro,
  } = useCompanyStore(
    useShallow(state => ({
      companyName: state.currentCompany?.companyName,
      companyLogo: state.currentCompany?.companyLogo,
      jobName: state.currentCompany?.jobName,
      companyIntro: state.currentCompany?.companyIntro,
    })),
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [selectJob, setSelectJob] = useState<string | undefined>();
  const [employmentType, setEmploymentType] = useState<string | undefined>();
  const navigate = useNavigate();

  const handleGoMain = async () => {
    if (!selectJob || !employmentType) {
      toast.error(
        "직종 및 고용 형태를 선택해주세요. 안내받은 것이 없다면 선택 안함을 체크해 주세요.",
      );
      return;
    }
    setLoading(true);
    try {
      await setEmployeeUser({
        name,
        userId,
        email,
        phoneNumber,
        companyCode,
        selectJob,
        employmentType,
      });
      setLoading(false);
      navigate(`/${companyCode}/appguide`);
    } catch (e: any) {
      setLoading(false);
      toast.error("가입도중 에러가 발생했습니다.");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gray-50">
      <div className="flex flex-col gap-6 w-full max-w-md sm:max-w-sm flex-1">
        {/* Title */}
        <div className="mt-4">
          <h2 className="scroll-m-20 text-2xl font-bold tracking-tight text-center">
            Attandance-App
          </h2>
        </div>

        {/* Company Info Section */}
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
          <div>
            <Label className="text-black text-lg mb-3 flex items-center">
              회사 직종 선택
              <TooltipContainer
                icon={<Info size={18} />}
                contentText="관리자에게 안내받지 않았다면 선택 안함을 체크해주세요"
              />
            </Label>
            <Select onValueChange={setSelectJob} value={selectJob}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="직종을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="선택안함">선택 안함</SelectItem>
                {jobList &&
                  Object.values(jobList).map((job: TJob, index: number) => (
                    <SelectItem key={index} value={job.jobName}>
                      {job.jobName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div>
            <Label className="text-black text-lg mb-3 flex items-center">
              고용 형태 선택
              <TooltipContainer
                icon={<Info size={18} />}
                contentText="관리자에게 안내받지 않았다면 선택 안함을 체크해주세요"
              />
            </Label>
            <Select onValueChange={setEmploymentType} value={employmentType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="고용 형태를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="선택안함">선택 안함</SelectItem>
                <SelectItem value="정규직">정규직</SelectItem>
                <SelectItem value="계약직">계약직</SelectItem>
                <SelectItem value="일용직">일용직</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
