import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatMoney, numToKorean } from "../../util/formatMoney.util";
import darkModeStore from "@/store/darkmode.store";
import { useNavigate } from "react-router-dom";
import { subscribeToJobNames, updateEmployeeSettings } from "../../api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { TEmployee, TSalaryType } from "@/model/types/manager.type";
import { PAYMENT_METHODS } from "@/constants/paymentMethods";

type Job = { jobName: string };

const EmployeeItem = ({ user }: { user: TEmployee }) => {
  const { name, email, jobName, uid, salary, companyCode, salaryType, phone } = user;
  const [jobNames, setJobNames] = useState<Job[]>([]);
  const [selectedJobName, setSelectedJobName] = useState(jobName);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<TSalaryType>(salaryType);
  const [salaryAmount, setSalaryAmount] = useState(salary || 0);
  const darkMode = darkModeStore(state => state.darkMode);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = subscribeToJobNames(companyCode, (jobs: Job[]) => {
      setJobNames(jobs);
    });

    return () => {
      unsubscribe();
    };
  }, [companyCode]);

  const handleSettingSubmit = async () => {
    const result = await updateEmployeeSettings(companyCode, uid, {
      jobName: selectedJobName,
      salaryType: selectedPaymentMethod,
      salary: salaryAmount,
    });

    if (result.success) {
      toast.success("정보 수정이 완료되었습니다.");
    } else {
      toast.error("오류가 발생하였습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">수정</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>직원 정보</DialogTitle>
          <DialogDescription>정보를 수정할 수 있습니다.</DialogDescription>
        </DialogHeader>

        {/* 이름 */}
        <div className="grid grid-cols-2 border-b py-2">
          <span className="font-bold">이름</span>
          <span>{name}</span>
        </div>

        {/* 이메일 */}
        <div className="grid grid-cols-2 border-b py-2">
          <span className="font-bold">이메일</span>
          <span>{email}</span>
        </div>

        {/* 전화번호 */}
        <div className="grid grid-cols-2 border-b py-2">
          <span className="font-bold">휴대전화</span>
          <span>{phone}</span>
        </div>

        {/* 직종 선택 */}
        <div className="grid grid-cols-2 border-b py-2">
          <span className="font-bold">직종</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{selectedJobName}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {jobNames.map((job, index) => (
                <DropdownMenuItem key={index} onClick={() => setSelectedJobName(job.jobName)}>
                  {job.jobName}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 급여 지급 방식 선택 */}
        <div className="grid grid-cols-2 border-b py-2">
          <span className="font-bold">지급방식</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{PAYMENT_METHODS[selectedPaymentMethod]}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.entries(PAYMENT_METHODS).map(([key, label]) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => setSelectedPaymentMethod(key as keyof typeof PAYMENT_METHODS)}
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 급여 입력 */}
        <div className="grid grid-cols-2 border-b py-2">
          <span className="font-bold">급여</span>
          <div>
            <Input
              type="number"
              value={salaryAmount}
              onChange={e => setSalaryAmount(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500">{numToKorean(salaryAmount)} 원</div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="mt-4 flex justify-end gap-3">
          <Button onClick={handleSettingSubmit} variant="default">
            저장
          </Button>
          <Button variant="secondary">취소</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeItem;
