import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useUserStore } from "@/store/user.store";
import { useToast } from "@/hooks/use-toast";
import NoticeCard from "../common/NoticeCard";

const EmployeeInviteStep = () => {
  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const { toast } = useToast();
  const handleCopy = () => {
    if (companyCode) {
      navigator.clipboard.writeText(companyCode);
      toast({
        description: "복사가 완료되었습니다.",
      });
    } else {
      toast({
        description: "오류가 발생했습니다.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-md">
      {/* 초대 코드 섹션 */}
      <Card className="w-full ">
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-semibold">직원 초대 코드</CardTitle>
          <p className="text-gray-500 text-sm mt-1">
            직원들은 아래 초대 코드를 사용하여 가입할 수 있습니다.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-3">
          <div className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg">
            <Input
              className="w-40 text-lg font-bold text-center border-none"
              value={companyCode}
              readOnly
            />
            <Button variant="outline" size="icon" onClick={handleCopy} className="p-2">
              <Copy className="w-5 h-5 text-gray-500" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <NoticeCard
        title="회사 QR"
        description={<>회사 QR은 가입 후 다운받아 사용하실 수 있습니다.</>}
      />
    </div>
  );
};

export default EmployeeInviteStep;
