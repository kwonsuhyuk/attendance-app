import { toast } from "react-toastify";
import { EmployeeInfo, EmployeeForm } from "@/model/types/user.type";
import { useForm } from "react-hook-form";
import { formatMoney } from "@/util/formatMoney.util";
import { updateEmployeeSettings } from "@/api/employee.api";

export const useEmployeeModify = (user: EmployeeInfo, onClose: () => void) => {
  const { name, email, jobName, uid, salaryAmount, companyCode, employmentType, phoneNumber } =
    user;

  const { register, handleSubmit, setValue, watch } = useForm<EmployeeForm>({
    defaultValues: {
      selectedJob: jobName,
      selectedEmploymentType: employmentType,
      salary: salaryAmount,
    },
  });

  const salary = watch("salary");
  const selectedJob = watch("selectedJob");
  const selectedEmploymentType = watch("selectedEmploymentType");

  const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = event.target.value.replace(/,/g, ""); // 기존 쉼표 제거
    if (!/^\d*$/.test(rawValue)) return; // 숫자만 입력 허용
    setValue("salary", Number(rawValue));
  };

  const onSubmit = async (data: EmployeeForm) => {
    const result = await updateEmployeeSettings(companyCode, uid, {
      jobName: data.selectedJob,
      salaryType: data.selectedEmploymentType,
      salary: data.salary,
    });

    if (result.success) {
      window.location.reload();
      toast.success("정보 수정이 완료되었습니다.");
      onClose();
    } else {
      toast.error("오류가 발생하였습니다. 다시 시도해주세요.");
    }
  };

  return {
    name,
    email,
    phoneNumber,
    register,
    setValue,
    salary,
    selectedJob,
    selectedEmploymentType,
    handleSalaryChange,
    handleSubmit,
    onSubmit,
  };
};
