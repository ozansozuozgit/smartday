import moment from 'moment-timezone';
import React from 'react';

const TodayButton = ({ handleCalendarChange }: any) => {
  const handleTodayClick = () => {
    const timezone = 'America/Chicago';
    const startOfToday = moment().tz(timezone).startOf('day');
    const endOfToday = moment().tz(timezone).endOf('day');

    handleCalendarChange([startOfToday.toDate(), endOfToday.toDate()]);
  };
  return (
    <button
      className='rounded-lg bg-orange px-2 py-1 text-sm font-semibold text-white'
      onClick={handleTodayClick}
    >
      Today
    </button>
  );
};

export default TodayButton;
