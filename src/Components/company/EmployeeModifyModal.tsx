import { useState, useEffect } from "react";
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
import { formatMoney, numToKorean } from "../../util/formatMoney.util";
import { useEmployeeModify } from "@/hooks/manager/useEmployeeModify";
import { PAYMENT_METHODS } from "@/constants/paymentMethods";
import { EmployeeInfo } from "@/model/types/employeeInfo.type";

interface EmployeeInfoProps {
  user: EmployeeInfo;
  onClose: () => void;
}

const EmployeeItem = ({ user, onClose }: EmployeeInfoProps) => {
  const {
    name,
    email,
    phoneNumber,
    selectedJobName,
    setSelectedJobName,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    salary,
    handleSalaryChange,
    handleSettingSubmit,
    jobNames,
  } = useEmployeeModify(user, onClose);

  return (
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
                {Object.entries(PAYMENT_METHODS).map(([key, label]) => (
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
  );
};

export default EmployeeItem;
