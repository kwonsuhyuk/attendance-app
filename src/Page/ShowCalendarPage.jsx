import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MyCalendar from '../Components/Calendar/MyCalendar';
import ShowSalary from '../Components/ShowSalary/ShowSalary';
import { useMatch, useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';

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
    <div className="flex flex-col items-center justify-between gap-5">
      <div className="flex flex-row space-x-[150px] flex-grow overflow-y-auto items-center justify-center">
        <a
          className="cursor-pointer"
          onClick={() => navigate(`/${currentUser.photoURL}/companymain`)}
        >
          main
        </a>
        <a className="cursor-pointer">menu</a>
      </div>

      <div className="flex items-center justify-center">
        <MyCalendar />
      </div>
      <div className="flex items-center justify-center">
        <ShowSalary matchHome={matchHome} matchCalendar={matchCalendar} />
      </div>
    </div>
  );
};

export default ShowCalendarPage;
