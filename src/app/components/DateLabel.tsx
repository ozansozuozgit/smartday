import { useAppSelector } from '@/src/redux/hooks';
import moment from 'moment-timezone';
import React from 'react';

const DateLabel = () => {
  const startDate = useAppSelector((state) => state.user.startDate);
  const endDate = useAppSelector((state) => state.user.endDate);
  const formatDate = (date: any) => {
    if (!date) return;
    const cstTimezone = 'America/Chicago';
    const dateISO = moment(date).tz(cstTimezone).format('MMM DD, YYYY');
    return dateISO;
  };

  return (
    <div className='text-md text-gray-700 font-roboto'>
      <span className='font-semibold'>{formatDate(startDate)} -</span>{' '}
      <span className='font-semibold'>{formatDate(endDate)}</span>
    </div>
  );
};

export default DateLabel;
