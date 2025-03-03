import { useState, useEffect } from "react";
import { fetchJobNames, updateEmployee } from "@/api/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateEmployeeSettings } from "../../api";
import { formatMoney, numToKorean } from "../../util/formatMoney.util";

const paymentMethods = {
  monthlyPay: "월급 지급",
  dailyPay: "일급 지급",
  hourPay: "시급 지급",
};

const EmployeeItem = ({ user, onClose }) => {
  const { name, email, jobName, uid, salaryAmount, companyCode, salaryType, phoneNumber } = user;
  const [selectedJobName, setSelectedJobName] = useState(jobName);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(salaryType);
  const [salary, setSalary] = useState(salaryAmount);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadJobName() {
      const jobs = await fetchJobNames(user.companyCode);
      setJobNames(jobs || []);
    }
    loadJobName();
  }, [user.companyCode]);

  const handleSalaryChange = event => {
    let value = event.target.value.replace(/\D/g, ""); // 숫자만 입력 가능
    setSalary(value);
  };

  // const handleUpdate = async () => {
  //   const result = await updateEmployee(user.companyCode, user.uid, {
  //     jobName: selectedJob,
  //     salary: salary,
  //   });

  // const handleFilterReset = () => {
  //   setSearchName("");
  //   setSelectedJob("전체");
  //   setSelectedSalaryType("전체");
  // };

  const handleSettingSubmit = async () => {
    const result = await updateEmployeeSettings(companyCode, uid, {
      jobName: selectedJobName,
      salaryType: selectedPaymentMethod,
      salary: salary,
    });

    if (result.success) {
      window.location.reload();
      toast.success("정보 수정이 완료되었습니다.");
      onClose(); // 모달 닫기
    } else {
      toast.error("오류가 발생하였습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between border-b border-gray-300 py-4 text-sm lg:grid lg:grid-cols-8">
        <span>{name}</span>
        <span className="hidden lg:block">{email}</span>
        <span className="hidden lg:block">{phoneNumber}</span>
        <span>{jobName}</span>
        <span>{paymentMethods[salaryType]}</span>
        <span className="hidden lg:block">
          {salaryAmount && formatMoney(parseInt(salaryAmount))}원
        </span>
        <Button variant="outline" size="sm" onClick={() => onClose(user)}>
          수정
        </Button>
        <Button
          variant="link"
          size="sm"
          onClick={() => navigate(`/${companyCode}/datecheck/${uid}`)}
        >
          상세보기 & 정산 {">"}
        </Button>
      </div>

      <Dialog open={!!user} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>직원 정보 수정</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">이름</span>
              <span>{name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">이메일</span>
              <span>{email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">휴대전화</span>
              <span>{phoneNumber}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">직종</span>
              <Select defaultValue={selectedJobName} onValueChange={setSelectedJobName}>
                <SelectTrigger>
                  <SelectValue placeholder="직종 선택" />
                </SelectTrigger>
                <SelectContent>
                  {/* 여기에 직종 데이터를 동적으로 추가 가능 */}
                  {["과장", "대리", "직원"].map(job => (
                    <SelectItem key={job} value={job}>
                      {job}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">급여 지급 방식</span>
              <Select defaultValue={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="급여 지급 방식 선택" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(paymentMethods).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">급여</span>
              <Input type="number" value={salary} onChange={handleSalaryChange} />
              <span className="text-xs text-gray-500">= {numToKorean(salary)} 원</span>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSettingSubmit}>저장</Button>
            <Button variant="outline" onClick={onClose}>
              취소
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmployeeItem;
