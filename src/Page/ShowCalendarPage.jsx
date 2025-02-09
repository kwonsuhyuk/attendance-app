import { useSelector } from "react-redux";
import MyCalendar from "../components/Calendar/MyCalendar";
import ShowSalary from "../components/ShowSalary/ShowSalary";
import { useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTour } from "@reactour/tour";
import { CALENDAR_STEPS } from "../constant/tourStep";

const ShowCalendarPage = () => {
  const { currentUser } = useSelector(state => state.user);
  const matchCalendar = useMatch(`/${currentUser?.photoURL}/calendar`);
  const matchHome = useMatch(`/${currentUser?.photoURL}`);
  const { isOpen, setCurrentStep, setSteps, setIsOpen } = useTour();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setCurrentStep(0);
        setSteps(CALENDAR_STEPS(setIsOpen));
      }, 300);

      return () => {
        clearTimeout(timer), setSteps([]);
      };
    }
  }, [isOpen, setCurrentStep, setSteps, setIsOpen]);

  return (
    <div className="flex flex-col items-center justify-between my-3 h-full" data-tour="step-39">
      <div data-tour="step-40">
        <div className="flex items-center justify-center mb-3" data-tour="step-41">
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
