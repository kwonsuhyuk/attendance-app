import { useToast } from "@/hooks/use-toast";
import { EmployeeInfo, EmployeeForm } from "@/model/types/user.type";
import { useForm } from "react-hook-form";
import { updateEmployeeSettings } from "@/api/employee.api";
import { useState } from "react";
import { useCompanyStore } from "@/store/company.store";

export const useEmployeeModify = (user: EmployeeInfo, setIsUpdated: (value: boolean) => void) => {
  const { name, email, jobName, uid, salaryAmount, companyCode, employmentType, phoneNumber } =
    user;

  const { register, handleSubmit, setValue, watch } = useForm<EmployeeForm>({
    defaultValues: {
      selectedJob: jobName,
      selectedEmploymentType: employmentType,
      salary: salaryAmount,
    },
  });

  const { toast } = useToast();

  const salary = watch("salary");
  const selectedJob = watch("selectedJob");
  const selectedEmploymentType = watch("selectedEmploymentType");

  const [isEditing, setIsEditing] = useState(false);
  const jobList = useCompanyStore(state => state.currentCompany?.jobList);
  const companyCodeStore = useCompanyStore(state => state.currentCompany?.companyCode);

  const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = event.target.value.replace(/,/g, "");
    if (!/^\d*$/.test(rawValue)) return;

    const numericValue = rawValue === "" ? 0 : Number(rawValue);
    setValue("salary", numericValue);
  };

  const onSubmit = async (data: EmployeeForm) => {
    if (
      user.jobName === data.selectedJob &&
      user.employmentType === data.selectedEmploymentType &&
      user.salaryAmount === data.salary
    ) {
      toast({
        title: "안내",
        description: "변경된 내용이 없습니다.",
        variant: "default",
      });
      return;
    }

    const result = await updateEmployeeSettings(companyCode, uid, {
      jobName: data.selectedJob,
      employmentType: data.selectedEmploymentType,
      salary: data.salary,
    });

    if (result.success) {
      toast({
        title: "성공",
        description: "정보 수정이 완료되었습니다.",
        variant: "success",
      });
      setIsUpdated(true);
    } else {
      toast({
        title: "오류",
        description: "오류가 발생하였습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
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
    isEditing,
    setIsEditing,
    jobList,
    companyCode: companyCodeStore || companyCode,
  };
};
