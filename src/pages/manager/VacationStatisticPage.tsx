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
import { set } from "date-fns";
const dummyEmployees: TEmpUserData[] = [
  {
    uid: "1",
    name: "김수현",
    email: "soo@company.com",
    phoneNumber: "010-1234-5678",
    companyCode: "A123",
    userType: "employee",
    jobName: "프론트엔드",
    employmentType: "정규직",
  },
  {
    uid: "2",
    name: "이수빈",
    email: "soobin@company.com",
    phoneNumber: "010-2345-6789",
    companyCode: "A123",
    userType: "employee",
    jobName: "백엔드",
    employmentType: "정규직",
  },
  {
    uid: "3",
    name: "박지훈",
    email: "jihun@company.com",
    phoneNumber: "010-3456-7890",
    companyCode: "A123",
    userType: "employee",
    jobName: "디자이너",
    employmentType: "계약직",
  },
  {
    uid: "4",
    name: "최유진",
    email: "yujin@company.com",
    phoneNumber: "010-4567-8901",
    companyCode: "A123",
    userType: "employee",
    jobName: "기획자",
    employmentType: "정규직",
  },
  {
    uid: "5",
    name: "정우성",
    email: "woosung@company.com",
    phoneNumber: "010-5678-9012",
    companyCode: "A123",
    userType: "employee",
    jobName: "데이터 분석",
    employmentType: "정규직",
  },
  {
    uid: "6",
    name: "한지민",
    email: "jimin@company.com",
    phoneNumber: "010-6789-0123",
    companyCode: "A123",
    userType: "employee",
    jobName: "프론트엔드",
    employmentType: "계약직",
  },
  {
    uid: "7",
    name: "김지훈",
    email: "jhoon@company.com",
    phoneNumber: "010-7890-1234",
    companyCode: "A123",
    userType: "employee",
    jobName: "백엔드",
    employmentType: "정규직",
  },
  {
    uid: "8",
    name: "송하늘",
    email: "sky@company.com",
    phoneNumber: "010-8901-2345",
    companyCode: "A123",
    userType: "employee",
    jobName: "디자이너",
    employmentType: "정규직",
  },
  {
    uid: "9",
    name: "윤도현",
    email: "dohyun@company.com",
    phoneNumber: "010-9012-3456",
    companyCode: "A123",
    userType: "employee",
    jobName: "기획자",
    employmentType: "정규직",
  },
  {
    uid: "10",
    name: "오지수",
    email: "jisoo@company.com",
    phoneNumber: "010-0123-4567",
    companyCode: "A123",
    userType: "employee",
    jobName: "데이터 분석",
    employmentType: "계약직",
  },
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
    const found = dummyEmployees.find(emp => emp.uid === uid);
    if (found) setSelectedName(found);
    else setSelectedName(null);
  }, [searchParams]);

  // 이름 선택 시 쿼리 업데이트
  const handleNameSelect = (user: TEmpUserData | null) => {
    if (user) {
      setSelectedName(user);
      const params = new URLSearchParams(searchParams);
      params.set("user", user.uid);
      setSearchParams(params);
    }
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
