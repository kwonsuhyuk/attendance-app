import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { EmployeeInfo } from "@/model/types/user.type";
import { useCompanyStore } from "@/store/company.store";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import AutoCompleteUserInput from "@/components/common/AutoCompleteInput";
import { useEmployeeList } from "@/hooks/manager/useEmployeeList";
import {
  AlertTriangle,
  Loader2,
  FileDown,
  TriangleAlert,
  RefreshCcw,
  User,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomCalendarHeader from "./CustomCalendarHeader";
import dayjs from "dayjs";
import useSettlement from "@/hooks/manager/useSettlement";
import { Card, CardTitle } from "@/components/ui/card";
import { useTour } from "@/hooks/use-tour";
import { useTourStore } from "@/store/tour.store";
import { settlementTourStep } from "@/constants/managerTourSteps";
import { useShallow } from "zustand/shallow";

dayjs.extend(isSameOrBefore);

export interface ISettlementRow {
  날짜: string;
  출근: string;
  퇴근: string;
  총근무시간: string;
  야간근무: string;
  휴일근무: string;
  근무유형: "정상출근" | "외근" | "휴가" | "";
  추가수당?: string;
}

interface SettlementProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  selectedEmployee: EmployeeInfo | null;
  setSelectedEmployee: (user: EmployeeInfo | null) => void;
  setEmployeeName: (name: string) => void;
}

const Settlement = ({
  currentDate,
  setCurrentDate,
  selectedEmployee,
  setSelectedEmployee,
  setEmployeeName,
}: SettlementProps) => {
  const { payCheckDay, nightStart, nightEnd, isHoliday, isDayNight, holidayPay, nightPay } =
    useCompanyStore(
      useShallow(state => ({
        payCheckDay: state.currentCompany?.payCheckDay,
        nightStart: state.currentCompany?.nightStart,
        nightEnd: state.currentCompany?.nightEnd,
        isHoliday: state.currentCompany?.isHoliday,
        isDayNight: state.currentCompany?.isDayNight,
        holidayPay: state.currentCompany?.holidayPay,
        nightPay: state.currentCompany?.nightPay,
      })),
    );

  const { employeeList } = useEmployeeList();
  const [summary, setSummary] = useState<ISettlementRow[]>([]);
  const { generateSettlement, downloadExcel } = useSettlement();
  const [loading, setLoading] = useState(false);
  const [includeSalary, setIncludeSalary] = useState(false);
  const salaryAmount = selectedEmployee?.salaryAmount ?? 0;
  const isSalaryInvalid = includeSalary && salaryAmount === 0;
  const navigate = useNavigate();

  useTour("settlement", settlementTourStep, [1, 5]);
  const { run, stepIndex, setStepIndex, steps } = useTourStore(
    useShallow(state => ({
      run: state.run,
      stepIndex: state.stepIndex,
      setStepIndex: state.setStepIndex,
      steps: state.steps,
    })),
  );

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  if (isMobile) {
    return (
      <div className="mx-auto mt-10 flex w-full max-w-md flex-col justify-center gap-5 rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
        <div className="mb-2 text-xl font-semibold text-red-600">⚠️ 안내</div>
        <p className="text-sm text-gray-700">
          이 페이지는 <strong>PC 환경</strong>에서만 이용 가능합니다.
        </p>
      </div>
    );
  }

  const handleGenerate = async () => {
    if (!selectedEmployee) return;
    setLoading(true);
    const data = await generateSettlement({
      employee: selectedEmployee,
      currentDate,
      includeSalary,
    });
    setSummary(data);
    setLoading(false);

    const currentStep = steps[stepIndex];
    if (run && currentStep?.target === '[data-tour="settlement-5"]') {
      setTimeout(() => {
        setStepIndex(stepIndex + 1);
      }, 300);
    }
  };

  const handleDownload = () => {
    if (!selectedEmployee) return;
    downloadExcel(summary, selectedEmployee, currentDate, includeSalary);
  };

  return (
    <Card
      className="relative mx-auto flex w-full max-w-4xl flex-col justify-between space-y-10 rounded-2xl border bg-white px-8 py-8"
      data-tour="settlement-1"
    >
      <CardTitle className="flex justify-between space-y-3">
        <h1 className="text-2xl font-bold">이번달 직원 정산</h1>
        <div className="flex items-center gap-2 text-xs leading-relaxed text-gray-600">
          <TriangleAlert className="shrink-0 text-yellow-500" />
          <div>
            해당 수당은{" "}
            <span className="font-medium text-rose-500">시급 기준으로 산정된 참고용 정보</span>이며
            법적 효력이 없습니다.
          </div>
        </div>
      </CardTitle>

      <section className="flex flex-col items-center justify-center gap-3">
        <CustomCalendarHeader
          onChangeMonth={newDate => {
            setCurrentDate(newDate);
            setSummary([]);
          }}
        />
        <p className="mt-3 px-1 text-xs text-gray-500">
          ※ 설정하신{" "}
          <strong className="text-vacation-color">회사 급여 정산일({payCheckDay}일)</strong>{" "}
          기준으로 전월 {payCheckDay}일 ~ 이번달 {Number(payCheckDay) - 1}일 까지의 출퇴근 시간 및
          수당 정산 데이터를 계산합니다.
        </p>
        <AutoCompleteUserInput
          users={employeeList}
          onSelect={emp => {
            setSelectedEmployee(emp);
            setEmployeeName(emp?.name || "");
            setSummary([]);

            const currentStep = steps[stepIndex];
            if (run && currentStep?.target === '[data-tour="settlement-1"]') {
              setTimeout(() => {
                setStepIndex(stepIndex + 1);
              }, 300);
            }
          }}
        />
      </section>

      {selectedEmployee && (
        <section
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-colors dark:border-gray-700 dark:bg-slate-700"
          data-tour="settlement-2"
        >
          <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
            <User className="h-5 w-5" />
            직원 정보
          </h3>
          <dl className="grid grid-cols-2 gap-y-4 text-sm text-gray-800 dark:text-gray-200 sm:text-base">
            <div className="space-y-1">
              <dt className="font-medium text-gray-500 dark:text-gray-400">이름</dt>
              <dd className="font-semibold text-gray-900 dark:text-white">
                {selectedEmployee.name}
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="font-medium text-gray-500 dark:text-gray-400">시급</dt>
              <dd className="font-bold text-vacation-color">{salaryAmount.toLocaleString()}원</dd>
            </div>
            <div className="space-y-1">
              <dt className="font-medium text-gray-500 dark:text-gray-400">직책</dt>
              <dd className="text-gray-900 dark:text-white">{selectedEmployee.jobName ?? "-"}</dd>
            </div>
            <div className="space-y-1">
              <dt className="font-medium text-gray-500 dark:text-gray-400">고용형태</dt>
              <dd className="text-gray-900 dark:text-white">
                {selectedEmployee.employmentType ?? "-"}
              </dd>
            </div>
          </dl>
        </section>
      )}

      {selectedEmployee && (
        <section className="flex items-center gap-3" data-tour="settlement-3">
          <div className="flex flex-1 items-start justify-between gap-4 rounded-lg border border-blue-200 bg-point-color-sub px-5 py-4 shadow-sm transition-colors dark:border-blue-400 dark:bg-blue-900/20">
            <div className="flex items-start gap-3">
              <Checkbox
                id="salaryCheck"
                checked={includeSalary}
                disabled={!!summary.length}
                onCheckedChange={v => setIncludeSalary(!!v)}
                className="mt-0.5"
              />
              <Label
                htmlFor="salaryCheck"
                className="text-sm leading-snug text-gray-800 dark:text-gray-100"
              >
                <strong className="font-semibold text-gray-900 dark:text-white">
                  수당 계산 포함하기
                </strong>
                <span className="mt-0.5 block text-sm text-gray-600 dark:text-gray-400">
                  시급 정보를 바탕으로 야근, 주말 근무 등 수당을 자동으로 계산합니다.
                </span>
              </Label>
            </div>
          </div>
        </section>
      )}
      {selectedEmployee && (
        <div
          className="rounded-2xl border border-solid border-point-color bg-white/60 p-6 shadow-sm backdrop-blur-sm dark:border-point-color-sub dark:bg-point-color-sub/10 dark:backdrop-blur"
          data-tour="settlement-4"
        >
          <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-vacation-dark-color dark:text-point-color">
            <AlertCircle className="h-5 w-5" />
            회사 정산 정책 안내
          </div>
          <div className="my-5 flex items-start gap-3 rounded-md border border-solid border-point-color bg-point-color-sub/20 p-4 text-sm text-point-color dark:border-point-color-sub dark:bg-point-color-sub/10 dark:text-point-color">
            <AlertTriangle className="mt-1 h-5 w-5 text-point-color" />
            <div>
              <span className="font-semibold">외근은 수당 계산에서 제외됩니다.</span>
              <div className="mt-1 text-xs text-point-color/80 dark:text-point-color-sub">
                출퇴근 기록 및 수당 계산 없이 외근 횟수만 정산됩니다.
              </div>
            </div>
          </div>
          <div className="grid gap-3 text-sm text-gray-900 dark:text-white">
            <div className="flex items-center justify-between">
              <span className="font-medium">정산 기준일</span>
              <span className="text-base font-bold text-gray-900">매월 {payCheckDay}일</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium">야간 시간</span>
              <span className="font-bold text-gray-900">
                {nightStart}시 ~ {nightEnd}시
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium">휴일 근무 수당</span>
              <div className="flex items-center gap-2">
                {isHoliday ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-point-color" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {holidayPay}배 적용
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-point-color" />
                    <span className="text-gray-900 dark:text-white">미포함</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium">야간 근무 수당</span>
              <div className="flex items-center gap-2">
                {isDayNight ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-point-color" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {nightPay}배 적용
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-point-color" />
                    <span className="text-gray-900 dark:text-white">미포함</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {isSalaryInvalid && (
        <section className="flex items-start gap-3 rounded-lg border border-yellow-400 bg-yellow-50 p-5">
          <AlertTriangle className="mt-1 h-5 w-5 text-yellow-500" />
          <div className="text-sm text-yellow-800">
            이 직원의 시급이 <strong>0원</strong>으로 설정되어 있어 수당 계산이 불가능합니다.
            <div className="mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/sqMaYLHc/manager/employeelist")}
              >
                직원 수당 설정
              </Button>
            </div>
          </div>
        </section>
      )}

      {summary.length > 0 && (
        <>
          <section
            className="rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm text-gray-800"
            data-tour="settlement-6"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>날짜</TableHead>
                  <TableHead>출근</TableHead>
                  <TableHead>퇴근</TableHead>
                  <TableHead>총 근무</TableHead>
                  <TableHead>야간 근무</TableHead>
                  <TableHead>휴일</TableHead>
                  <TableHead>근무일</TableHead>
                  <TableHead>외근</TableHead>
                  {includeSalary && <TableHead>수당</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {summary.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{row.날짜}</TableCell>
                    <TableCell>{row.출근}</TableCell>
                    <TableCell>{row.퇴근}</TableCell>
                    <TableCell>{row.총근무시간}</TableCell>
                    <TableCell>{row.야간근무}</TableCell>
                    <TableCell>{row.휴일근무}</TableCell>
                    <TableCell>{row.근무유형 === "정상출근" ? "✅" : ""}</TableCell>
                    <TableCell>{row.근무유형 === "외근" ? "✅" : ""}</TableCell>
                    {includeSalary && <TableCell>{row.추가수당}</TableCell>}
                  </TableRow>
                ))}
                <TableRow className="bg-point-color-sub text-base font-semibold text-vacation-dark-color">
                  <TableCell colSpan={3}>총 합계</TableCell>

                  {/* 총 근무시간 계산 */}
                  <TableCell>
                    {(() => {
                      const totalMinutes = summary.reduce((acc, cur, idx) => {
                        const match = cur.총근무시간?.match(/(\d+)시간 (\d+)분/);

                        return acc + (match ? parseInt(match[1]) * 60 + parseInt(match[2]) : 0);
                      }, 0);
                      return `${Math.floor(totalMinutes / 60)}시간 ${totalMinutes % 60}분`;
                    })()}
                  </TableCell>

                  {/* 야간 근무시간 계산 */}
                  <TableCell>
                    {(() => {
                      const totalNight = summary.reduce((acc, cur, idx) => {
                        const match = cur.야간근무?.match(/(\d+)시간 (\d+)분/);

                        return acc + (match ? parseInt(match[1]) * 60 + parseInt(match[2]) : 0);
                      }, 0);
                      return `${Math.floor(totalNight / 60)}시간 ${totalNight % 60}분`;
                    })()}
                  </TableCell>

                  <TableCell>-</TableCell>

                  {/* 근무일 (정상출근) */}
                  <TableCell>
                    {summary.filter(row => row.근무유형 === "정상출근").length}일
                  </TableCell>

                  {/* 외근일 */}
                  <TableCell>{summary.filter(row => row.근무유형 === "외근").length}일</TableCell>

                  {/* 추가 수당 총합 */}
                  {includeSalary && (
                    <TableCell>
                      {summary
                        .reduce((acc, cur) => {
                          const num = Number(cur.추가수당?.replace(/[^\d]/g, ""));
                          return acc + (isNaN(num) ? 0 : num);
                        }, 0)
                        .toLocaleString()}
                      원
                    </TableCell>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </section>
        </>
      )}

      <div className="w-full">
        {summary.length === 0 ? (
          <Button
            onClick={handleGenerate}
            disabled={!selectedEmployee || loading}
            className="flex w-full items-center justify-center py-4 text-base font-semibold"
            data-tour="settlement-5"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" /> 계산 중
              </span>
            ) : (
              "정산 데이터 생성하기"
            )}
          </Button>
        ) : (
          <Button
            onClick={handleDownload}
            className="flex w-full items-center justify-center py-4 text-base font-semibold"
            data-tour="settlement-7"
          >
            <FileDown className="mr-2 h-5 w-5" /> 엑셀 다운로드
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Settlement;
