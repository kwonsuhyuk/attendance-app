import { useSelector } from "react-redux";
import MyCalendar from "../Components/Calendar/MyCalendar";
import ShowSalary from "../Components/ShowSalary/ShowSalary";
import { useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTour } from "@reactour/tour";

const ShowCalendarPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const matchCalendar = useMatch(`/${currentUser?.photoURL}/calendar`);
  const matchHome = useMatch(`/${currentUser?.photoURL}`);
  const { isOpen, setCurrentStep, setSteps, setIsOpen } = useTour();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setCurrentStep(0);
        setSteps([
          {
            selector: '[data-tour="step-39"]',
            content: `여기는 나의 회사 출퇴근 기록을 좀 더 상세하게 볼 수 있는 페이지입니다. 하나씩 살펴볼까요?`,
          },
          {
            selector: '[data-tour="step-40"]',
            content: `달력먼저 살펴보겠습니다. 각 셀의 색깔은 아래 라벨의 시간처럼 몇시간 근무했는지 전체적으로 볼 수 있게 해줍니다.`,
          },
          {
            selector: '[data-tour="step-41"]',
            content: `또한 달력의 날짜를 클릭시에는 그 날짜의 상세 정보를 보실 수 있습니다.`,
          },
          {
            selector: '[data-tour="step-42"]',
            content: `마지막으로 정산일 이후로 부터 이번달 근무 시간 등을 요약해서 볼 수 있는 테이블 입니다. 회사 정산 날짜가 지나면 초기화 됩니다.`,
          },
          {
            selector: '[data-tour="step-43"]',
            content: `혹시 페이지가 로딩이 잘되지 않던가 작동이 잘 되지 않으면 위의 새로고침 버튼을 눌러주세요.`,
          },
          {
            selector: '[data-tour="step-39"]',
            content: `앞으로 사용하시면서 모르는 것이 있다면 오른쪽 아래 가이드를 이용해주시거나 ABOUT 페이지에서 문의 해주세요! 감사합니다!`,
            action: () => {
              setTimeout(() => {
                setIsOpen(false);
              }, 3000);
            },
          },
        ]);
      }, 300);

      return () => {
        clearTimeout(timer), setSteps([]);
      };
    }
  }, [isOpen, setCurrentStep, setSteps, setIsOpen]);

  return (
    <div
      className="flex flex-col items-center justify-between my-3 h-full"
      data-tour="step-39">
      <div data-tour="step-40">
        <div
          className="flex items-center justify-center mb-3"
          data-tour="step-41">
          <MyCalendar />
        </div>
        <div className="flex flex-row justify-start mr-auto mb-5">
          <div className="bg-red-300 font-normal text-base w-6 h-6 flex items-center justify-center text-black">
            0+
          </div>
          <div className="bg-yellow-300 font-normal text-base w-6 h-6 flex items-center justify-center text-black">
            4+
          </div>
          <div className="bg-green-300 font-normal text-base w-6 h-6 flex items-center justify-center text-black">
            8+
          </div>
          <div className="bg-blue-300 font-normal text-sm w-10 h-6 flex items-center justify-center text-black">
            외근
          </div>
        </div>
      </div>
      <div className="w-full" data-tour="step-42">
        <ShowSalary matchHome={matchHome} matchCalendar={matchCalendar} />
      </div>
    </div>
  );
};

export default ShowCalendarPage;
