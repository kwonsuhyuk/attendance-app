import React from "react";
import { useSelector } from "react-redux";

const OutjobCheckPage = () => {
  const { darkMode } = useSelector((state) => state.darkmodeSlice);
  const handleCheckOutJob = () => {};
  return (
    <div>
      <div
        onClick={handleCheckOutJob}
        className="text-xl bg-gray-700 text-white dark:bg-white dark:text-gray-700 p-3 text-center"
        style={{
          bg: !darkMode ? "1px solid #00000033" : "1px solid #FFFFFF33",
        }}>
        외근 출퇴근 체크하기
      </div>
      <div></div>
    </div>
  );
};

export default OutjobCheckPage;
