import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const IntroGuideBox = () => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const { companyCode } = useParams();

  useEffect(() => {
    const isClosed = localStorage.getItem("guide_closed");
    if (isClosed === "true") {
      setVisible(false);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("guide_closed", "true");
    setVisible(false);
  };

  const handleNavigate = () => {
    if (companyCode) {
      navigate(`/${companyCode}/employee/appguide`);
    } else {
      console.warn("companycode가 없습니다.");
    }
  };

  if (!visible) return null;

  return (
    <Card className="relative overflow-hidden rounded-xl border border-blue-500 bg-blue-600 p-6 text-white shadow-md dark:border-blue-400 dark:bg-blue-700">
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-3 top-3 text-white hover:bg-white/10"
        onClick={handleClose}
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="flex flex-col gap-3">
        <p className="text-base font-semibold leading-snug">
          On&Off 서비스를 처음 이용하시나요? <br />
          아래 가이드를 확인해보세요!
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <Button
            variant="secondary"
            className="h-9 w-full flex-1 bg-white text-blue-700 hover:bg-blue-100 dark:text-blue-800"
            onClick={handleNavigate}
          >
            다운로드 가이드 보기
          </Button>

          <Button
            className="h-9 w-full flex-1 border-white text-white hover:bg-white hover:text-blue-600"
            onClick={() => navigate("/commuteguide")}
          >
            출퇴근 가이드 보기
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default IntroGuideBox;
