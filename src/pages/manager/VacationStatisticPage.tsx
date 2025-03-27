import { useEffect, useState } from "react";
import VacationStatisticLayout from "@/layout/VacationStatisticLayout";
import VacationStatisticContainer from "@/components/container/manager/VacationStatisticContainer";
import VacationChart from "@/components/company/vacation/VacationChart";
import VacationStatisticTable from "@/components/company/vacation/VacationStatisticTable";
import VacationPieChart from "@/components/company/vacation/VacationPieChart";
import VacationFilter from "@/components/company/vacation/VacationFilter";
import { Card } from "@/components/ui/card";
import { TEmpUserData } from "@/model/types/user.type";
import { useSearchParams, useNavigate } from "react-router-dom";
const dummyEmployees: TEmpUserData[] = [
  {
    uid: "1",
    name: "김수현",
    email: "",
    phoneNumber: "",
    companyCode: "",
    userType: "employee",
    jobName: "프론트엔드",
    employmentType: "정규직",
  },
  {
    uid: "2",
    name: "김수영",
    email: "",
    phoneNumber: "",
    companyCode: "",
    userType: "employee",
    jobName: "백엔드",
    employmentType: "정규직",
  },
  // ... 추가 더미 데이터
];

const VacationStatisticPage = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [mode, setMode] = useState<"month" | "year">("month");
  const [selectedName, setSelectedName] = useState<TEmpUserData | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("user"));
  const navigate = useNavigate();
  console.log(selectedName);
  // 쿼리에서 user=1 값을 읽어 초기 선택 유저 설정
  useEffect(() => {
    const uid = searchParams.get("user");
    console.log("쿼리에서 가져온 uid:", uid);

    const found = dummyEmployees.find(emp => emp.uid === uid);
    console.log("찾은 유저:", found);

    if (found) setSelectedName(found);
  }, []);

  // 이름 선택 시 쿼리 업데이트
  const handleNameSelect = (user: TEmpUserData) => {
    setSelectedName(user);
    const params = new URLSearchParams(searchParams);
    params.set("user", user.uid);
    setSearchParams(params);
  };

  return (
    <VacationStatisticLayout>
      <VacationFilter
        selectedName={selectedName}
        selectedMonth={selectedDate}
        setSelectedMonth={setSelectedDate}
        selectedMode={mode}
        setSelectedMode={setMode}
        handleNameSelect={handleNameSelect}
      />
      <VacationStatisticContainer>
        <VacationChart selectedDate={selectedDate} selectedName={selectedName} mode={mode} />
        <div className="flex min-h-[680px] flex-col gap-3 md:flex-row">
          <Card className="hidden h-full items-center justify-center px-4 py-10 md:block md:min-h-[680px] md:w-1/3">
            <VacationPieChart selectedDate={selectedDate} selectedName={selectedName} mode={mode} />
          </Card>
          <VacationStatisticTable />
        </div>
      </VacationStatisticContainer>
    </VacationStatisticLayout>
  );
};

export default VacationStatisticPage;
