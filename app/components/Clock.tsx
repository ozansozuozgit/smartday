'use client';
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(
    moment().tz('America/New_York')
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment().tz('America/New_York'));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedTime = currentTime.format('dddd, MMMM D, YYYY h:mm:ss A');

  return (
    <div>
      <h2>{formattedTime}</h2>
    </div>
  );
};

export default Clock;
