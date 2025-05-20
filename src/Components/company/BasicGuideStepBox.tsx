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
    <Card className="relative rounded-xl bg-sky-100 p-4 shadow-md dark:bg-sky-950">
      <button
        className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
        onClick={handleClose}
        aria-label="닫기"
      >
        <X size={20} />
      </button>
      <CardTitle className="mb-3 text-base font-bold text-sky-800 dark:text-white">
        서비스 시작하기
      </CardTitle>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {steps.map((step, idx) => {
            return (
              <div
                key={idx}
                onClick={() => {
                  if (step.checked) return;
                  if (step.link) {
                    navigate(`/${companyCode}${step.link}`);
                  } else if (step.action) {
                    step.action();
                  }
                }}
                className={`relative flex cursor-pointer items-center justify-between gap-3 rounded-lg bg-white px-4 py-5 shadow-sm transition hover:bg-sky-50 dark:bg-slate-800 dark:hover:bg-gray-700 ${
                  step.checked ? "cursor-default hover:bg-white dark:hover:bg-gray-800" : ""
                }`}
              >
                <div className="flex items-center gap-2 text-sky-700 dark:text-sky-300">
                  {step.icon}
                  <span className="text-sm font-semibold">{step.label}</span>
                </div>
                {step.checked ? (
                  <CheckCircle2 className="text-green-500" size={22} />
                ) : step.action ? (
                  <Copy className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                ) : (
                  <ChevronRight className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                )}
              </div>
            );
          })}
        </div>
        <Progress value={progress} className="h-[6px] [&>div]:bg-sky-600" />
      </CardContent>
    </Card>
  );
};

export default BasicGuideStepBox;
