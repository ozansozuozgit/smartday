'use client'
import moment from 'moment-timezone';
import React from 'react';

const TodayButton = ({ handleCalendarChange }) => {
  const handleTodayClick = () => {
    const timezone = 'America/Chicago';
    const startOfToday = moment().tz(timezone).startOf('day');
    const endOfToday = moment().tz(timezone).endOf('day');

    handleCalendarChange([startOfToday.toDate(), endOfToday.toDate()]);
  };

  return (
    <button
      className='rounded-lg bg-orange-800 px-2 py-1 text-sm font-semibold text-white hover:opacity-75 mx-2 my-2 w-[100px] self-end'
      onClick={handleTodayClick}
    >
      Today
    </button>
  );
};

export default TodayButton;
