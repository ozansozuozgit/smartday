'use client';
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';
const Clock = () => {
  const cstTimezone = 'America/Chicago';
  const estTimezone = 'America/New_York';

  const timezone = cstTimezone;

  const [currentTime, setCurrentTime] = useState(
    moment().tz(timezone)
  );
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

  return <div>{hydrated && <h4 className='text-sm hidden 2xl:block'>{formattedTime}</h4>}</div>;
};

export default Clock;
