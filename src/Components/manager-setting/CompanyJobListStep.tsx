import { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CompanyJobListStep = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "companyJobList.companyJobs",
  });

  const [newJob, setNewJob] = useState(""); // ✅ useState로 입력 값 관리

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedJob = newJob.trim();

    if (trimmedJob) {
      append({ id: String(Date.now()), name: trimmedJob }); // ✅ 명확한 구조
      setNewJob(""); // 입력 필드 초기화
    }
  };

  type JobField = {
    id: string;
    name: string;
  };

  const jobFields = fields as JobField[];

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800">직무 추가</h2>
      <p className="text-sm text-gray-600 text-center">
        회사에서 관리할 직무를 추가하세요. <br />
        직원이 가입 시 선택할 수 있으며, 관리자가 변경할 수 있습니다.
      </p>

      {/* ✅ 직무 입력 필드 */}
      <form onSubmit={handleAddJob} className="w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">직무 추가</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Input
                value={newJob}
                onChange={e => setNewJob(e.target.value)}
                placeholder="ex) 과장, 대리"
                className="h-10 py-2"
              />
              <Button type="submit" className="h-10 px-4">
                추가
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* ✅ 추가된 직무 목록 */}
      {jobFields.length > 0 && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">추가된 직무 목록</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {jobFields.map((field, index) => (
              <Card key={field.id} className="flex justify-between items-center p-3">
                <span className="text-sm font-medium">{field.name}</span>
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  className="h-auto p-0 bg-transparent hover:bg-transparent hover:text-red-500"
                >
                  <X className="w-5 h-5" />
                </Button>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompanyJobListStep;
