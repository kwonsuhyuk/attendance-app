import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SalaryType from '../../util/SalaryType';
import { formatMoney } from '../../util/formatMoney';
import convertTime from '../../util/formatTime';
import GuidePopover from '../GuidePopover';
import Loading from '../common/Loading';
import { fetchSalaryInfo } from '../../api';

//import SalaryDay from '../Utils/SalaryDay';

function ShowSalary({ matchCalendar, matchHome }) {
  const [isLoading, setIsLoading] = useState(false);
  const [salaryInfo, setSalaryInfo] = useState({
    salaryDay: 0,
    period1: {
      dayHours: 0,
      nightHours: 0,
      holidayHours: 0,
      dayPay: 0,
      nightPay: 0,
      holidayPay: 0,
      totalWorkHours: 0,
      totalPay: 0,
    },
    period2: {
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
        // currentWorkResult 제거

        if (salaryResult.success) {
          setSalaryInfo(salaryResult.data);
        }
      } catch (error) {
        console.error('Error loading salary data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [companyCode, userId]);

  if (isLoading) {
    return <Loading />;
  }

  const currentPeriod = now > salaryInfo.salaryDay ? salaryInfo.period1 : salaryInfo.period2;

  if (matchCalendar) {
    return (
      <>
        {(currentPeriod.totalWorkHours || salaryPayment || monthlyPay) && (
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
                    {convertTime(currentPeriod.dayHours.toFixed(1))}
                  </td>
                  <td className="pl-6 py-3 text-end text-nowrap">
                    {monthlyPay ? null : formatMoney(currentPeriod.dayPay)}원
                  </td>
                </tr>
                <tr className="border-b border-solid border-white-border-sub dark:border-dark-border-sub">
                  <th
                    scope="row"
                    className="pr-6 py-3 font-medium whitespace-nowrap border-r border-solid border-white-border-sub dark:border-dark-border-sub text-start">
                    야간
                  </th>
                  <td className="px-6 border-r border-solid border-white-border-sub dark:border-dark-border-sub text-end">
                    {convertTime(currentPeriod.nightHours.toFixed(1))}
                  </td>
                  <td className="pl-6 py-3 text-end text-nowrap">
                    {monthlyPay ? null : formatMoney(currentPeriod.nightPay)}원
                  </td>
                </tr>
                <tr className="border-b border-solid border-white-border-sub dark:border-dark-border-sub">
                  <th
                    scope="row"
                    className="pr-6 py-3 font-medium whitespace-nowrap border-r border-solid border-white-border-sub dark:border-dark-border-sub text-start">
                    공휴일 및 주말
                  </th>
                  <td className="px-6 border-r border-solid border-white-border-sub dark:border-dark-border-sub text-end">
                    {convertTime(currentPeriod.holidayHours.toFixed(1))}
                  </td>
                  <td className="pl-6 py-3 text-end text-nowrap">
                    {monthlyPay ? null : formatMoney(currentPeriod.holidayPay)}원
                  </td>
                </tr>
                <tr className="px-6 border-b border-solid border-white-border-sub dark:border-dark-border-sub font-bold">
                  <th
                    scope="row"
                    className="pr-6 py-3 text-start text-gray-900 whitespace-nowrap dark:text-white border-r border-solid border-white-border-sub dark:border-dark-border-sub uppercase">
                    이번 달 총합
                  </th>
                  <td className="px-6 border-r border-solid border-white-border-sub dark:border-dark-border-sub text-end">
                    {convertTime(currentPeriod.totalWorkHours.toFixed(1))}
                  </td>
                  <td className="pl-6 py-3 text-end text-nowrap">
                    {monthlyPay ? formatMoney(monthlyPay) : formatMoney(currentPeriod.totalPay)}원
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
    return (
      <div className="flex flex-col justify-between items-center text-sm w-full">
        <div className="flex flex-row justify-between items-center w-full">
          {currentPeriod.dayPay > 0 && !monthlyPay && (
            <div className="flex flex-col justify-between items-center space-y-4 w-full">
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-baseline">최근 일한 날짜</div>
                <div className="flex items-baseline">{today}</div>
              </div>
              <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-start">최근 근무 형태</div>
                <div className="flex items-baseline">주간</div>
              </div>
              <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-baseline">해당 급여</div>
                <div className="flex items-baseline">{formatMoney(currentPeriod.dayPay)}원</div>
              </div>
            </div>
          )}
          {currentPeriod.nightPay > 0 && !monthlyPay && (
            <div className="flex flex-col justify-between items-center space-y-4 w-full">
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-baseline">최근 일한 날짜</div>
                <div className="flex items-baseline">{today}</div>
              </div>
              <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-start">최근 근무 형태</div>
                <div className="flex items-baseline">야간</div>
              </div>
              <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-baseline">해당 급여</div>
                <div className="flex items-baseline">{formatMoney(currentPeriod.nightPay)}원</div>
              </div>
            </div>
          )}
          {currentPeriod.holidayPay > 0 && !monthlyPay && (
            <div className="flex flex-col justify-between items-center space-y-4 w-full">
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-baseline">최근 일한 날짜</div>
                <div className="flex items-baseline">{today}</div>
              </div>
              <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-start">최근 근무 형태</div>
                <div className="flex items-baseline">공휴일 및 주말</div>
              </div>
              <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-baseline">해당 급여</div>
                <div className="flex items-baseline">{formatMoney(currentPeriod.holidayPay)}원</div>
              </div>
            </div>
          )}
          {monthlyPay > 0 && (
            <div className="flex flex-col justify-between items-center space-y-4 w-full">
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-baseline">최근 일한 날짜</div>
                <div className="flex items-baseline">{today}</div>
              </div>
              <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-start">최근 근무 형태</div>
                <div className="flex items-baseline">월급</div>
              </div>
              <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-baseline">해당 급여</div>
                <div className="flex items-baseline">{formatMoney(monthlyPay)}원</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}

export default ShowSalary;
