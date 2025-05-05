import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useUserStore } from "@/store/user.store";
import { useToast } from "@/hooks/use-toast";
import NoticeCard from "@/components/common/NoticeCard";

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
    <div className="flex w-full max-w-md flex-col items-center space-y-6">
      {/* 초대 코드 섹션 */}
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-semibold">직원 초대 코드</CardTitle>
          <p className="mt-1 text-sm text-gray-500">
            직원들은 아래 초대 코드를 회원가입시 사용하여 가입할 수 있습니다.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-3">
          <div className="flex items-center space-x-2 rounded-lg border border-gray-300 px-4 py-2">
            <Input
              className="w-40 border-none text-center text-lg font-bold"
              value={companyCode}
              readOnly
            />
            <Button variant="outline" size="icon" onClick={handleCopy} className="p-2">
              <Copy className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeInviteStep;
