import RegisterModal from "@/components/common/modal/commonModalLayout/RegisterModal";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { IVacationRequest } from "@/components/company/table/VacationColumns";
import { useVacationRegister } from "@/hooks/manager/useVacationRegisterModal";
import { VACATIONSELECT_TYPES } from "@/constants/vacationSelect";
import AutoCompleteUserInput from "../AutoCompleteInput";
import { useEmployeeList } from "@/hooks/manager/useEmployeeList";
import { EmployeeInfo } from "@/model/types/user.type";

interface IVacationModalProps {
  onClose: () => void;
  onRegister: (newRequest: IVacationRequest) => void;
}

const VacationRegisterModal: React.FC<IVacationModalProps> = ({ onClose, onRegister }) => {
  const {
    vacationType,
    setVacationType,
    dateRange,
    setDateRange,
    vacationDays,
    handleRegister,
    reason,
    setReason,
    setInputValue,
    setSelectedEmployee,
    maxDate,
    handleDateChange,
  } = useVacationRegister(onRegister, onClose);

  const { employeeList } = useEmployeeList();

  return (
    <RegisterModal
      open
      onClose={onClose}
      title="휴가 등록"
      onSubmit={handleRegister}
      submitLabel="등록"
    >
      {/* 휴가 대상 */}
      <div className="flex flex-col gap-2">
        <span className="font-medium">휴가 대상</span>
        <AutoCompleteUserInput
          users={employeeList as EmployeeInfo[]}
          onSelect={(emp: EmployeeInfo | null) => {
            setSelectedEmployee(emp);
            setInputValue(`${emp?.name} (${emp?.email})`);
          }}
        />
      </div>

      {/* 휴가 유형 */}
      <div className="flex flex-col gap-2">
        <span className="font-medium">휴가 유형</span>
        <Select value={vacationType} onValueChange={setVacationType}>
          <SelectTrigger className="w-full dark:text-white-text">
            <SelectValue placeholder="휴가 유형 선택" />
          </SelectTrigger>
          <SelectContent className="dark:border dark:border-dark-border dark:bg-white-card-bg dark:text-white-text">
            {VACATIONSELECT_TYPES.map(type => (
              <SelectItem
                key={type}
                value={type}
                className="dark:text-white-text dark:hover:bg-white-bg"
              >
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {vacationType === "반차" && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ※ 반차는 하루만 선택할 수 있으며, 오전/오후 선택은 별도 설정 없이 처리됩니다.
          </p>
        )}
      </div>

      {/* 사용 기간 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <span className="font-medium">사용 기간 :</span>
          <div className="rounded-md border px-2 py-1 text-sm dark:border-dark-border dark:bg-white-bg">
            {vacationDays > 0 ? `${vacationDays}일` : ""}
          </div>
        </div>
        <DateRangePicker
          date={dateRange}
          setDate={handleDateChange}
          toDate={maxDate}
          vacationType={vacationType}
          handleDateChange={handleDateChange}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          ※ 휴가 등록은 <strong>최대 3개월</strong> 이후까지만 가능합니다.
        </p>
      </div>

      {/* 사유 */}
      <div className="flex flex-col gap-2">
        <span>사유</span>
        <textarea
          className="h-20 w-full rounded-md border p-2 text-base"
          value={reason}
          onChange={e => setReason(e.target.value)}
        />
      </div>
    </RegisterModal>
  );
};

export default VacationRegisterModal;
