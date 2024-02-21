import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MyCalendar from "../Components/Calendar/MyCalendar";
import ShowSalary from "../Components/ShowSalary/ShowSalary";
import { useMatch, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

const ShowCalendarPage = () => {
  const navigate = useNavigate();
  const { currentUser, userType } = useSelector((state) => state.user);
  const matchCalendar = useMatch(`/${currentUser?.photoURL}/calendar`);
  useEffect(() => {
    console.log(matchCalendar);
  }, []);
  const matchHome = useMatch(`/${currentUser?.photoURL}`);
  useEffect(() => {
    console.log(matchHome);
  }, []);
  console.log(matchCalendar);
  console.log(matchHome);

  return (
    <div className="flex flex-col items-center justify-between my-3 h-full">
      <div className="flex items-center justify-center mb-10">
        <MyCalendar />
      </div>
      <div className="w-full">
        <ShowSalary matchHome={matchHome} matchCalendar={matchCalendar} />
      </div>
    </div>
  );
};

export default ShowCalendarPage;
