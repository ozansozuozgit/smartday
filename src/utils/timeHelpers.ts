'use client';
import moment from 'moment-timezone';

const cstTimezone = 'America/Chicago';
const estTimezone = 'America/New_York';

const timezone = cstTimezone;

export const getTimes = () => {
  const startOfToday = moment().tz(timezone).startOf('day').toISOString();
  const endOfToday = moment().tz(timezone).endOf('day').toISOString();
  return { startOfToday, endOfToday };
};

export const formatDatetime = (date: any) => {
  return moment(date).tz(timezone).format('lll');
};

export const isToday = (date: any) => {
  const activityDate = moment(date).tz(timezone);
  const todayEST = moment()
    .tz(timezone)
    .startOf('day');

  return activityDate.isSameOrAfter(todayEST, 'day');
};

// export the current time in the EST timezone
export const nowInEst = () => {
  return moment().tz(timezone).toISOString();
}

