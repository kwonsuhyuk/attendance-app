import { SlidersHorizontalIcon } from "lucide-react";
import MonthPicker from "@/components/common/calendar/MonthPicker";
import AutoCompleteUserInput from "@/components/common/AutoCompleteInput";
import { TEmpUserData } from "@/model/types/user.type";
import { useSearchParams } from "react-router-dom";

interface IVacationFilterProps {
  selectedMonth: { year: number; month: number };
  setSelectedMonth: (value: { year: number; month: number }) => void;
  selectedMode: "month" | "year";
  selectedName: TEmpUserData | null;
  setSelectedMode: (value: "month" | "year") => void;
  handleNameSelect: (user: TEmpUserData | null) => void;
}

const VacationFilter = ({
  selectedMonth,
  setSelectedMonth,
  selectedMode,
  selectedName,
  setSelectedMode,
  handleNameSelect,
}: IVacationFilterProps) => {
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

  const [searchParams, setSearchParams] = useSearchParams();

  const handleClear = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("user");
    setSearchParams(newParams);
    handleNameSelect(null);
  };

  return (
    <div className="flex w-full flex-col items-center gap-3 py-3 sm:flex-row md:w-fit">
      <SlidersHorizontalIcon className="hidden w-10 text-white-nav-text sm:block" />
      <MonthPicker
        value={selectedMonth}
        onChange={setSelectedMonth}
        mode={selectedMode}
        setMode={setSelectedMode}
      />
      <AutoCompleteUserInput
        value={selectedName?.name ?? ""}
        users={dummyEmployees}
        onSelect={handleNameSelect}
        onClear={handleClear}
      />
    </div>
  );
};

export default VacationFilter;
