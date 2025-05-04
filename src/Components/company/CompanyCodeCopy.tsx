import React from "react";
import { useParams } from "react-router-dom";
import { Card } from "../ui/card";
import { Copy } from "lucide-react";

import { Button } from "../ui/button"; // 버튼 스타일을 일관되게 유지
import { useToast } from "@/hooks/use-toast";

const CompanyCodeCopy = () => {
  const { companyCode } = useParams();
  const { toast } = useToast();

  const handleCopy = async () => {
    if (companyCode) {
      await navigator.clipboard.writeText(companyCode);
      toast({
        title: "복사 완료",
        description: "회사 코드가 클립보드에 복사되었습니다.",
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Card className="flex items-center bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
        {companyCode}
      </Card>
      <Button variant="ghost" size="icon" onClick={handleCopy} className="hover:bg-accent">
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CompanyCodeCopy;
