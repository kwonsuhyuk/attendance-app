import { useCompanyStore } from "@/store/company.store";
import dayjs from "dayjs";

interface Props {
  calendar: (number | null)[];
  currentDate: Date;
}

const DAYS = Array.from({ length: 30 }, (_, i) => {
  const date = i + 1;
  const day = ["일", "월", "화", "수", "목", "금", "토"][new Date(2025, 3, date).getDay()];
  return `${date}/${day}`;
});

const MOCK_EMPLOYEES = [
  {
    name: "오민택",
    position: "대리",
    records: Array(30).fill("출근"),
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "출근":
      return "bg-green-500 text-white";
    case "미출근":
      return "bg-red-500 text-white";
    case "휴가":
      return "bg-yellow-500 text-white";
    case "외근":
      return "bg-blue-500 text-white";
    default:
      return "bg-gray-100";
  }
};

const PeriodAttTable = ({ calendar, currentDate }: Props) => {
  const daysInMonth = dayjs(currentDate).daysInMonth();
  const companyName = useCompanyStore(state => state.currentCompany?.companyName);

  const dynamicDays = Array.from({ length: daysInMonth }, (_, i) => {
    const date = i + 1;
    const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), date).getDay();
    const weekday = ["일", "월", "화", "수", "목", "금", "토"][day];
    return { date, weekday }; // 이렇게 객체 형태로 반환
  });

  const STATUSES = ["출근", "외근", "휴가", ""];
  const MOCK_EMPLOYEES = [
    {
      name: "오민택",
      position: "대리",
      records: Array.from({ length: daysInMonth }, () => {
        const randomIdx = Math.floor(Math.random() * STATUSES.length);
        return STATUSES[randomIdx];
      }),
    },
    {
      name: "오민택",
      position: "대리",
      records: Array.from({ length: daysInMonth }, () => {
        const randomIdx = Math.floor(Math.random() * STATUSES.length);
        return STATUSES[randomIdx];
      }),
    },
    {
      name: "오민택",
      position: "대리",
      records: Array.from({ length: daysInMonth }, () => {
        const randomIdx = Math.floor(Math.random() * STATUSES.length);
        return STATUSES[randomIdx];
      }),
    },
    {
      name: "오민택",
      position: "대리",
      records: Array.from({ length: daysInMonth }, () => {
        const randomIdx = Math.floor(Math.random() * STATUSES.length);
        return STATUSES[randomIdx];
      }),
    },
    {
      name: "오민택",
      position: "대리",
      records: Array.from({ length: daysInMonth }, () => {
        const randomIdx = Math.floor(Math.random() * STATUSES.length);
        return STATUSES[randomIdx];
      }),
    },
    {
      name: "오민택",
      position: "대리",
      records: Array.from({ length: daysInMonth }, () => {
        const randomIdx = Math.floor(Math.random() * STATUSES.length);
        return STATUSES[randomIdx];
      }),
    },
    {
      name: "오민택",
      position: "대리",
      records: Array.from({ length: daysInMonth }, () => {
        const randomIdx = Math.floor(Math.random() * STATUSES.length);
        return STATUSES[randomIdx];
      }),
    },
    {
      name: "오민택",
      position: "대리",
      records: Array.from({ length: daysInMonth }, () => {
        const randomIdx = Math.floor(Math.random() * STATUSES.length);
        return STATUSES[randomIdx];
      }),
    },
    {
      name: "오민택",
      position: "대리",
      records: Array.from({ length: daysInMonth }, () => {
        const randomIdx = Math.floor(Math.random() * STATUSES.length);
        return STATUSES[randomIdx];
      }),
    },
    {
      name: "오민택",
      position: "대리",
      records: Array.from({ length: daysInMonth }, () => {
        const randomIdx = Math.floor(Math.random() * STATUSES.length);
        return STATUSES[randomIdx];
      }),
    },
    {
      name: "오민택",
      position: "대리",
      records: Array.from({ length: daysInMonth }, () => {
        const randomIdx = Math.floor(Math.random() * STATUSES.length);
        return STATUSES[randomIdx];
      }),
    },
    {
      name: "오민택",
      position: "대리",
      records: Array.from({ length: daysInMonth }, () => {
        const randomIdx = Math.floor(Math.random() * STATUSES.length);
        return STATUSES[randomIdx];
      }),
    },
    {
      name: "오민택",
      position: "대리",
      records: Array.from({ length: daysInMonth }, () => {
        const randomIdx = Math.floor(Math.random() * STATUSES.length);
        return STATUSES[randomIdx];
      }),
    },
    {
      name: "오민택",
      position: "대리",
      records: Array.from({ length: daysInMonth }, () => {
        const randomIdx = Math.floor(Math.random() * STATUSES.length);
        return STATUSES[randomIdx];
      }),
    },
    {
      name: "오민택",
      position: "대리",
      records: Array.from({ length: daysInMonth }, () => {
        const randomIdx = Math.floor(Math.random() * STATUSES.length);
        return STATUSES[randomIdx];
      }),
    },
    {
      name: "오민택",
      position: "대리",
      records: Array.from({ length: daysInMonth }, () => {
        const randomIdx = Math.floor(Math.random() * STATUSES.length);
        return STATUSES[randomIdx];
      }),
    },
    {
      name: "오민택",
      position: "대리",
      records: Array.from({ length: daysInMonth }, () => {
        const randomIdx = Math.floor(Math.random() * STATUSES.length);
        return STATUSES[randomIdx];
      }),
    },
    {
      name: "오민택",
      position: "대리",
      records: Array.from({ length: daysInMonth }, () => {
        const randomIdx = Math.floor(Math.random() * STATUSES.length);
        return STATUSES[randomIdx];
      }),
    },
  ];

  return (
    <div className="min-h-[630px] w-full p-6">
      <div className="sticky top-0 z-20 rounded-t-xl bg-point-color py-4 pl-6 text-left text-base font-semibold text-white-text">
        {companyName} 직원 근태 현황
      </div>
      <div className="w-full overflow-x-auto rounded-b-xl border border-solid border-white-border-sub">
        <div className="w-[calc(80px*14+150px)] min-w-[1100px]">
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="sticky top-0 z-10 bg-gray-100 text-sm text-gray-700">
                <th className="sticky left-0 z-30 w-[160px] border border-white-border-sub bg-white">
                  이름 / 직무
                </th>
                {dynamicDays.map(({ date, weekday }, idx) => (
                  <th
                    key={idx}
                    className={`w-[80px] border border-white-border-sub bg-gray-100 p-3 ${
                      idx === 13
                        ? "after:absolute after:right-0 after:top-0 after:h-full after:w-[1px] after:bg-gray-300 after:content-['']"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center gap-1 leading-tight">
                      <span>{date}</span>
                      <span className="text-xs text-gray-500">{weekday}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_EMPLOYEES.map((emp, idx) => (
                <tr key={idx} className="text-center text-sm">
                  <td className="sticky left-0 z-20 w-[150px] border border-white-border-sub bg-white p-3 font-medium shadow-[2px_0_0_0_#E5E7EB]">
                    {emp.name} / {emp.position}
                  </td>
                  {emp.records.map((status, i) => (
                    <td
                      key={i}
                      className={`w-[80px] whitespace-nowrap border border-white-border-sub p-3 ${getStatusColor(status)}`}
                    >
                      {status}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PeriodAttTable;
