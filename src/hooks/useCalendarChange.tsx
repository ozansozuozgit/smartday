'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import {
  setEndDate,
  setSelectedGoal,
  setStartDate,
} from '@/src/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import moment from 'moment-timezone';
import { useState } from 'react';

export const useCalendarChange = () => {
  const dispatch = useAppDispatch();
  const selectedGoal = useAppSelector((state) => state.user.selectedGoal);

  const [value, setValue] = useState<Date | Date[] | null | string>([
    new Date(),
    new Date(),
  ]);

  const getGoalandActivities = async (start: any, end: any) => {
    if (!selectedGoal?.id) return;

    const res = await fetch(
      `${getBaseUrl()}/api/goal?goalId=${
        selectedGoal?.id
      }&startDate=${start}&endDate=${end}`
    );
    const goalResult = await res.json();

    dispatch(setSelectedGoal(goalResult));
  };

  const handleCalendarChange = (newValue: Date | Date[]) => {
    const [startDate, endDate] = newValue as Date[];

    const startISO = moment(startDate).toISOString();
    const endISO = moment(endDate).toISOString();

    const startMoment = moment(startISO).tz('America/New_York').startOf('day');
    const endMoment = moment(endISO).tz('America/New_York').endOf('day');

    dispatch(setStartDate(startMoment.toISOString()));
    dispatch(setEndDate(endMoment.toISOString()));

    getGoalandActivities(startMoment, endMoment);
    setValue(newValue);
  };

  return { value, handleCalendarChange };
};
