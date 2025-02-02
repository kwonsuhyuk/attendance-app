import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SalaryType from "../../util/SalaryType";
import { formatMoney } from "../../util/formatMoney";
import convertTime from "../../util/formatTime";
import GuidePopover from "../GuidePopover";
import Loading from "../common/Loading";
import { fetchSalaryInfo } from "../../api";
import { toast } from "react-toastify";
import SalaryInfoCard from "./SalaryInfoCard.jsx";

//import SalaryDay from '../Utils/SalaryDay';

function ShowSalary({ matchCalendar, matchHome }) {
  const [isLoading, setIsLoading] = useState(false);
  const [salaryInfo, setSalaryInfo] = useState({
    salaryDay: 0,
    currentPeriod: {
      // 현재 급여 계산 기간 (급여일 이후)
      dayHours: 0,
      nightHours: 0,
      holidayHours: 0,
      dayPay: 0,
      nightPay: 0,
      holidayPay: 0,
      totalWorkHours: 0,
      totalPay: 0,
    },
    previousPeriod: {
      // 이전 급여 계산 기간
      dayHours: 0,
      nightHours: 0,
      holidayHours: 0,
      dayPay: 0,
      nightPay: 0,
      holidayPay: 0,
      totalWorkHours: 0,
      totalPay: 0,
    },
  });

  const { currentUser } = useSelector(state => state.user);
  const companyCode = currentUser?.photoURL;
  const userId = currentUser?.uid;
  const { salaryPayment, monthlyPay } = SalaryType(companyCode, userId);
  const now = new Date().getDate();

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const loadData = async () => {
      if (!companyCode || !userId) return;

      setIsLoading(true);
      try {
        const salaryResult = await fetchSalaryInfo(companyCode, userId);
        if (salaryResult.success) {
          setSalaryInfo(salaryResult.data);
        } else {
          toast.error("급여 정보를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error("Error loading salary data:", error);
        toast.error("급여 정보 로딩 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [companyCode, userId]);

  if (isLoading) {
    return <Loading />;
  }

  const activePeriod = now > salaryInfo.salaryDay ? salaryInfo.currentPeriod : salaryInfo.previousPeriod;

  // 홈 화면 렌더링 데이터 개선
  const getRenderData = () => {
    if (!activePeriod) return []; // activePeriod가 없을 경우 빈 배열 반환

    if (monthlyPay > 0) {
      return [{ workType: "월급", amount: monthlyPay }];
    }

    return [
      activePeriod.dayPay > 0 && { workType: "주간", amount: activePeriod.dayPay },
      activePeriod.nightPay > 0 && { workType: "야간", amount: activePeriod.nightPay },
      activePeriod.holidayPay > 0 && { workType: "공휴일 및 주말", amount: activePeriod.holidayPay },
    ].filter(Boolean);
  };

  if (matchCalendar) {
    return (
      <>
        {(activePeriod.totalWorkHours || salaryPayment || monthlyPay) && (
          <div className="relative w-full h-full overflow-x-auto">
            <div className="py-2 text-base font-bold flex items-center">
              이번달 근무내역 <GuidePopover text="회사의 정산일부터 계산된 내용입니다." show={false} />
            </div>

            <div className="text-xs pb-1">(외근은 포함되지 않습니다. 관리자에게 문의해주세요.)</div>
            <table className="w-full text-xs rtl:text-right text-center border-none">
              <thead className="text-xs border-t border-b border-solid border-white-border-sub dark:border-dark-border-sub uppercase">
                <tr>
                  <th
                    scope="col"
                    className="pr-6 py-3 border-r border-solid border-white-border-sub dark:border-dark-border-sub text-start">
                    Work
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border-r border-solid border-white-border-sub dark:border-dark-border-sub text-end">
                    Time
                  </th>
                  <th scope="col" className="pl-6 py-3 text-end">
                    Pay
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-solid border-white-border-sub dark:border-dark-border-sub">
                  <th
                    scope="row"
                    className="pr-6 py-3 font-medium whitespace-nowrap border-r border-solid border-white-border-sub dark:border-dark-border-sub text-start">
                    주간
                  </th>
                  <td className="px-6 border-r border-solid border-white-border-sub dark:border-dark-border-sub text-end">
                    {convertTime(activePeriod.dayHours.toFixed(1))}
                  </td>
                  <td className="pl-6 py-3 text-end text-nowrap">
                    {monthlyPay ? null : formatMoney(activePeriod.dayPay)}원
                  </td>
                </tr>
                <tr className="border-b border-solid border-white-border-sub dark:border-dark-border-sub">
                  <th
                    scope="row"
                    className="pr-6 py-3 font-medium whitespace-nowrap border-r border-solid border-white-border-sub dark:border-dark-border-sub text-start">
                    야간
                  </th>
                  <td className="px-6 border-r border-solid border-white-border-sub dark:border-dark-border-sub text-end">
                    {convertTime(activePeriod.nightHours.toFixed(1))}
                  </td>
                  <td className="pl-6 py-3 text-end text-nowrap">
                    {monthlyPay ? null : formatMoney(activePeriod.nightPay)}원
                  </td>
                </tr>
                <tr className="border-b border-solid border-white-border-sub dark:border-dark-border-sub">
                  <th
                    scope="row"
                    className="pr-6 py-3 font-medium whitespace-nowrap border-r border-solid border-white-border-sub dark:border-dark-border-sub text-start">
                    공휴일 및 주말
                  </th>
                  <td className="px-6 border-r border-solid border-white-border-sub dark:border-dark-border-sub text-end">
                    {convertTime(activePeriod.holidayHours.toFixed(1))}
                  </td>
                  <td className="pl-6 py-3 text-end text-nowrap">
                    {monthlyPay ? null : formatMoney(activePeriod.holidayPay)}원
                  </td>
                </tr>
                <tr className="px-6 border-b border-solid border-white-border-sub dark:border-dark-border-sub font-bold">
                  <th
                    scope="row"
                    className="pr-6 py-3 text-start text-gray-900 whitespace-nowrap dark:text-white border-r border-solid border-white-border-sub dark:border-dark-border-sub uppercase">
                    이번 달 총합
                  </th>
                  <td className="px-6 border-r border-solid border-white-border-sub dark:border-dark-border-sub text-end">
                    {convertTime(activePeriod.totalWorkHours.toFixed(1))}
                  </td>
                  <td className="pl-6 py-3 text-end text-nowrap">
                    {monthlyPay ? formatMoney(monthlyPay) : formatMoney(activePeriod.totalPay)}원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </>
    );
  }

  if (matchHome) {
    const renderData = getRenderData();
    return (
      <div className="flex flex-col justify-between items-center text-sm w-full">
        <div className="flex flex-row justify-between items-center w-full">
          {renderData &&
            renderData.length > 0 &&
            renderData.map((data, index) => (
              <SalaryInfoCard key={index} date={today} workType={data.workType} amount={data.amount} />
            ))}
        </div>
      </div>
    );
  }

  return null;
}

export default ShowSalary;
