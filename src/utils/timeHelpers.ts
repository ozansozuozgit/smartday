'use client';
import moment from 'moment-timezone';

const estTimezone = 'America/New_York';

export const getTimes = () => {
  const startOfToday = moment().tz(estTimezone).startOf('day').toISOString();
  const endOfToday = moment().tz(estTimezone).endOf('day').toISOString();
  return { startOfToday, endOfToday };
};

export const formatDatetime = (date: any) => {
  return moment(date).tz('America/New_York').format('lll');
};

export const isToday = (date: any) => {
  const activityDate = moment(date).tz('America/New_York');
  const todayEST = moment()
    .tz('America/Chicago')
    .clone()
    .tz('America/New_York')
    .startOf('day');

  return activityDate.isSameOrAfter(todayEST, 'day');
};

// export the current time in the EST timezone
export const nowInEst = () => {
  return moment().tz(estTimezone).toISOString();
}

