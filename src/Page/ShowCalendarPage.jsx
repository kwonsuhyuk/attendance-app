import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MyCalendar from '../Components/Calendar/MyCalendar';
import ShowSalary from '../Components/ShowSalary/ShowSalary';
import { useMatch } from 'react-router-dom';
import { Divider } from '@mui/material';

const ShowCalendarPage = () => {
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
    <div>
      <div className="flex flex-row space-x-[150px]">
        <a
          className="cursor-pointer"
          onClick={() => navigate(`${currentUser.photoURL}/`)}
        >
          main
        </a>
        <a className="cursor-pointer">menu</a>
      </div>
      <Divider />
      <div>
        <MyCalendar />
      </div>
      <div>
        <ShowSalary matchHome={matchHome} matchCalendar={matchCalendar} />
      </div>
    </div>
  );
};

export default ShowCalendarPage;
