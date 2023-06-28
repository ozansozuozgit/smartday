'use client';
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';

const Clock = () => {
  const cstTimezone = 'America/Chicago';
  const estTimezone = 'America/New_York';

  const timezone = cstTimezone;

  const [currentTime, setCurrentTime] = useState(moment().tz(timezone));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const timer = setInterval(() => {
      setCurrentTime(moment().tz(timezone));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedTime = currentTime.format(' MMMM D, YYYY h:mm:ss A');

  return (
    <div className='self-start'>
      {hydrated && (
        <div className='text-xs hidden 2xl:block font-open_sans space-y-1'>
          <h4 className='font-semibold text-teal-500'>Goals Reset Daily At 12 AM CST</h4>
          <h4 className='text-gray-700'>{formattedTime} CST</h4>
        </div>
      )}
    </div>
  );
};

export default Clock;
