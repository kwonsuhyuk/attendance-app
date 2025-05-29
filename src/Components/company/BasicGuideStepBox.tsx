import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { useCompanyStore } from "@/store/company.store";
import { MapPin, Briefcase, Users, CheckCircle2, ChevronRight, Copy, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useEmployeeList } from "@/hooks/manager/useEmployeeList";

const BasicGuideStepBox = () => {
  const navigate = useNavigate();
  const { companyCode } = useParams();
  const workplaces = useCompanyStore(state => state.currentCompany?.workPlacesList);
  const jobList = useCompanyStore(state => state.currentCompany?.jobList);
  const { employeeList } = useEmployeeList();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("hideGuideBox");
    if (stored === "true") {
      setVisible(false);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem("hideGuideBox", "true");
  };

  const handleCopyCompanyCode = async () => {
    if (companyCode) {
      await navigator.clipboard.writeText(companyCode);
      toast({
        title: "복사 완료",
        description: "회사 코드가 클립보드에 복사되었습니다.",
      });
    }
  };

  const steps = [
    {
      label: "근무지 등록하기",
      checked: !!workplaces?.length,
      icon: <MapPin size={24} />,
      link: "/manager/workplacemanage",
    },
    {
      label: "직무 등록하기",
      checked: !!jobList?.length,
      icon: <Briefcase size={24} />,
      link: "/manager/positionmanage",
    },
    {
      label: "직원 초대하기",
      checked: !!employeeList?.length,
      icon: <Users size={24} />,
      action: handleCopyCompanyCode,
    },
  ];

  const progress = (steps.filter(step => step.checked).length / steps.length) * 100;

  if (!visible || progress === 1000) return null;

  return (
    <Card className="relative overflow-hidden rounded-2xl bg-point-color p-6 shadow-xl dark:bg-[#b4c8bb]">
      <button
        className="absolute right-4 top-4 text-black/60 hover:text-black"
        onClick={handleClose}
        aria-label="닫기"
      >
        <X size={20} />
      </button>

      <CardTitle className="mb-2 text-xl font-extrabold text-black">서비스 시작하기</CardTitle>
      <p className="mb-4 text-sm text-black/70">
        On&Off를 완벽하게 사용하기 위한 설정을 완료해주세요!
      </p>

      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {steps.map((step, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (step.checked) return;
                if (step.link) navigate(`/${companyCode}${step.link}`);
                else if (step.action) step.action();
              }}
              className={`group relative flex w-full items-center justify-between gap-3 rounded-xl bg-white px-5 py-4 shadow transition hover:-translate-y-[2px] hover:shadow-lg ${
                step.checked ? "cursor-default opacity-50" : "cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-3 text-black">
                <div className="bg-point-color-sub/20 rounded-full p-2 transition group-hover:scale-110">
                  {step.icon}
                </div>
                <span className="text-sm font-semibold">{step.label}</span>
              </div>
              <div>
                {step.checked ? (
                  <CheckCircle2 className="text-green-600" size={22} />
                ) : step.action ? (
                  <Copy className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronRight className="h-6 w-6 text-gray-400" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-black/70">
            <span>진행률</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress
            value={progress}
            className="h-[8px] rounded-full bg-white [&>div]:bg-vacation-dark-color"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicGuideStepBox;
