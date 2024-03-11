import { useSelector } from "react-redux";
import MyCalendar from "../Components/Calendar/MyCalendar";
import ShowSalary from "../Components/ShowSalary/ShowSalary";
import { useMatch } from "react-router-dom";
import { useState } from "react";

const ShowCalendarPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const matchCalendar = useMatch(`/${currentUser?.photoURL}/calendar`);
  const matchHome = useMatch(`/${currentUser?.photoURL}`);

  return (
    <div className="flex flex-col items-center justify-between my-3 h-full">
      <div className="flex items-center justify-center mb-3">
        <MyCalendar />
      </div>
      <div className="flex flex-row justify-start mr-auto mb-5">
        <div className="bg-red-300 font-normal text-base w-6 h-6 flex items-center justify-center">
          0+
        </div>
        <div className="bg-yellow-300 font-normal text-base w-6 h-6 flex items-center justify-center">
          4+
        </div>
        <div className="bg-green-300 font-normal text-base w-6 h-6 flex items-center justify-center">
          8+
        </div>
        <div className="bg-blue-300 font-normal text-sm w-10 h-6 flex items-center justify-center">
          외근
        </div>
      </div>
      <div className="w-full">
        <ShowSalary matchHome={matchHome} matchCalendar={matchCalendar} />
      </div>
    </div>
  );
};

export default ShowCalendarPage;
