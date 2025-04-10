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
  {
    name: "김수진",
    position: "과장",
    records: Array(30).fill("외근"),
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "출근":
      return "bg-cyan-300 text-white";
    case "미출근":
      return "bg-yellow-300 text-white";
    case "휴가":
      return "bg-green-300 text-white";
    case "외근":
      return "bg-lime-300 text-white";
    default:
      return "bg-gray-100";
  }
};

const PeriodAttTable = ({ calendar, currentDate }: Props) => {
  const daysInMonth = dayjs(currentDate).daysInMonth();

  const dynamicDays = Array.from({ length: daysInMonth }, (_, i) => {
    const date = i + 1;
    const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), date).getDay();
    const weekday = ["일", "월", "화", "수", "목", "금", "토"][day];
    return { date, weekday }; // 이렇게 객체 형태로 반환
  });

  const MOCK_EMPLOYEES = [
    {
      name: "오민택",
      position: "대리",
      records: Array(daysInMonth).fill("출근"),
    },
    {
      name: "김수진",
      position: "과장",
      records: Array(daysInMonth).fill("외근"),
    },
  ];

  return (
    <div className="min-h-[630px] overflow-auto rounded border border-gray-200 p-6">
      <table className="min-w-[800px] table-fixed border-collapse border border-solid">
        <thead className="bg-gray-100 text-sm text-gray-700">
          <tr>
            <th className="w-[150px] border p-2">이름 / 직무</th>
            {dynamicDays.map(({ date, weekday }, idx) => (
              <th key={idx} className="w-[80px] border p-2">
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
              <td className="whitespace-nowrap border p-2 font-medium">
                {emp.name} / {emp.position}
              </td>

              {emp.records.map((status, i) => (
                <td key={i} className={`whitespace-nowrap border p-2 ${getStatusColor(status)}`}>
                  {status}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeriodAttTable;
