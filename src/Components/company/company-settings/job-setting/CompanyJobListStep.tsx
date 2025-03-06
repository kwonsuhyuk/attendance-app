import { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Card } from "@/components/ui/card";

import JobListCard from "./JobListCard";
import CompanySettingTitle from "../CompanySettingTitle";
import FormInputWithButton from "../../form/FormInputWithButton";
import NoticeCard from "@/components/common/NoticeCard";

interface ICompanyJobListStepProps {
  type?: "setting" | "firstpage";
}

const CompanyJobListStep = ({ type = "firstpage" }: ICompanyJobListStepProps) => {
  const { control } = useFormContext();

  const prefix = type === "firstpage" ? "companyJobList." : "";

  const { fields, append, remove } = useFieldArray({
    control,
    name: `${prefix}companyJobs`,
  });

  const [newJob, setNewJob] = useState("");

  const handleAddJob = (e?: React.FormEvent | React.KeyboardEvent) => {
    e?.preventDefault();

    const trimmedJob = newJob.trim();
    if (!trimmedJob) return;

    append({ id: String(Date.now()), name: trimmedJob });
    setNewJob("");
  };
  return (
    <div className="flex w-full max-w-md flex-col items-center space-y-6">
      <CompanySettingTitle
        title="직무 추가"
        description={
          <>
            회사에서 관리할 직무를 추가하세요. <br />
            직원이 가입 시 선택할 수 있으며, 관리자가 변경할 수 있습니다.
          </>
        }
      />
      <Card className="w-full p-4">
        <FormInputWithButton
          value={newJob}
          onChange={e => setNewJob(e.target.value)}
          onSubmit={handleAddJob}
          onKeyUp={e => e.key === "Enter" && handleAddJob(e)}
          placeholder="ex) 과장, 대리"
          buttonText="추가"
        />
      </Card>
      <JobListCard jobs={fields as { id: string; name: string }[]} onRemove={remove} />
      <NoticeCard
        title="직원 고용 형태"
        description={
          <>
            직원들은 가입 시 <strong>정규직, 계약직, 일용직</strong> 중 선택할 수 있습니다. <br />
            관리자는 이후 고용 형태를 변경할 수 있습니다.
          </>
        }
      />
    </div>
  );
};

export default CompanyJobListStep;
