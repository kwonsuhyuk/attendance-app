import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MyCalendar from '../Components/Calendar/MyCalendar';
import ShowSalary from '../Components/ShowSalary/ShowSalary';
import { useMatch } from 'react-router-dom';

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
      <MyCalendar />
      <ShowSalary matchHome={matchHome} matchCalendar={matchCalendar} />
    </div>
  );
};

export default ShowCalendarPage;
