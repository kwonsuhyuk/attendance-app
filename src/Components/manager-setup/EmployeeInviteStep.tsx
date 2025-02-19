import { useState } from "react";
import { Button } from "@/components/ui/button";

const EmployeeInviteStep = () => {
  const [companyCode, setCompanyCode] = useState("1234ABC"); // 더미 데이터

  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-xl font-semibold">직원 초대 코드</h2>
      <p>직원들은 아래 초대 코드를 사용하여 가입할 수 있습니다.</p>
      <div className="bg-gray-200 px-4 py-2 rounded-md text-lg font-bold">{companyCode}</div>
      <Button onClick={() => navigator.clipboard.writeText(companyCode)}>코드 복사</Button>
    </div>
  );
};

export default EmployeeInviteStep;
