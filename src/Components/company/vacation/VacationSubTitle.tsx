import { EmployeeInfo } from "@/model/types/user.type";
import { twMerge } from "tailwind-merge";

interface VacationSubTitleProps {
  selectedDate: { year: number; month: number };
  selectedName: EmployeeInfo | null;
  mode: "month" | "year";
  title: string;
  className?: string;
  br?: boolean;
}

const VacationSubTitle = ({
  selectedDate,
  selectedName,
  mode,
  title,
  className,
  br,
}: VacationSubTitleProps) => {
  return (
    <h3
      className={twMerge(
        "flex items-center gap-2 text-lg font-semibold text-white-text dark:text-dark-text md:text-xl",
        className,
      )}
    >
      {selectedDate.year}년{mode === "month" && ` ${selectedDate.month + 1}월`}
      {selectedName ? ` ${selectedName.name}님의` : " 전체"}
      {br && <br />}
      {title}
    </h3>
  );
};

export default VacationSubTitle;
