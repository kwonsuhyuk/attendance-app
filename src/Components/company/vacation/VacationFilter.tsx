import { SlidersHorizontalIcon } from "lucide-react";
import MonthPicker from "@/components/common/calendar/MonthPicker";
import AutoCompleteUserInput from "@/components/common/AutoCompleteInput";
import { TEmpUserData } from "@/model/types/user.type";

interface IVacationFilterProps {
  selectedMonth: { year: number; month: number };
  setSelectedMonth: (value: { year: number; month: number }) => void;
  selectedMode: "month" | "year";
  selectedName: TEmpUserData | null;
  setSelectedMode: (value: "month" | "year") => void;
  handleNameSelect: (user: TEmpUserData) => void;
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
      name: "김수영",
      email: "sooyoung@company.com",
      phoneNumber: "010-2345-6789",
      companyCode: "A123",
      userType: "employee",
      jobName: "백엔드",
      employmentType: "계약직",
    },
    {
      uid: "3",
      name: "김수정",
      email: "sujung@company.com",
      phoneNumber: "010-3456-7890",
      companyCode: "A123",
      userType: "employee",
      jobName: "디자이너",
      employmentType: "정규직",
    },
    {
      uid: "4",
      name: "김수연",
      email: "suyeon@company.com",
      phoneNumber: "010-4567-8901",
      companyCode: "A123",
      userType: "employee",
      jobName: "기획자",
      employmentType: "정규직",
    },
    {
      uid: "5",
      name: "김수환",
      email: "soohwan@company.com",
      phoneNumber: "010-5678-9012",
      companyCode: "A123",
      userType: "employee",
      jobName: "프론트엔드",
      employmentType: "정규직",
    },
    {
      uid: "6",
      name: "김수빈",
      email: "soobin@company.com",
      phoneNumber: "010-6789-0123",
      companyCode: "A123",
      userType: "employee",
      jobName: "백엔드",
      employmentType: "정규직",
    },
    {
      uid: "7",
      name: "김수경",
      email: "sookyung@company.com",
      phoneNumber: "010-7890-1234",
      companyCode: "A123",
      userType: "employee",
      jobName: "데이터 분석",
      employmentType: "계약직",
    },
  ];

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
        value={selectedName?.name}
        users={dummyEmployees}
        onSelect={handleNameSelect}
      />
    </div>
  );
};

export default VacationFilter;
