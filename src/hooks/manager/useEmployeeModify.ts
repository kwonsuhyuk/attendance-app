import { updateEmployeeSettings } from "@/api";
import { toast } from "react-toastify";
import { EmployeeInfo, EmployeeForm } from "@/model/types/user.type";
import { useForm } from "react-hook-form";

export const useEmployeeModify = (user: EmployeeInfo, onClose: () => void) => {
  const { name, email, jobName, uid, salaryAmount, companyCode, salaryType, phoneNumber } = user;

  const { register, handleSubmit, setValue, watch } = useForm<EmployeeForm>({
    defaultValues: {
      selectedJob: jobName,
      selectedSalaryType: salaryType,
      salary: salaryAmount,
    },
  });

  const salary = watch("salary");
  const selectedJob = watch("selectedJob");
  const selectedSalaryType = watch("selectedSalaryType");

  const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, ""); // 숫자만 입력 가능
    setValue("salary", parseInt(value, 10) || 0);
  };

  const onSubmit = async (data: EmployeeForm) => {
    const result = await updateEmployeeSettings(companyCode, uid, {
      jobName: data.selectedJob,
      salaryType: data.selectedSalaryType,
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
    selectedSalaryType,
    handleSalaryChange,
    handleSubmit,
    onSubmit,
  };
};
