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
    <Card className="relative rounded-md border border-muted bg-blue-600 p-4 text-white dark:border-muted/50 dark:bg-blue-600">
      <Button
        size="icon"
        className="absolute right-2 top-2 bg-transparent dark:text-white"
        onClick={handleClose}
      >
        <X className="h-4 w-4" />
      </Button>

      <p className="text-sm font-medium">On&Off 서비스 다운로드 방법을 확인해보세요!</p>

      <Button
        variant="outline"
        className="mt-3 h-8 rounded-md bg-blue-100 px-3 text-sm font-semibold text-blue-800 hover:bg-blue-200 dark:text-blue-800"
        onClick={handleNavigate}
      >
        다운로드 가이드 바로가기 →
      </Button>
    </Card>
  );
};

export default IntroGuideBox;
