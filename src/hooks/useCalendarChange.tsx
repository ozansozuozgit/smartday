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

  const cstTimezone = 'America/Chicago';
  const estTimezone = 'America/New_York';
  const timezone = cstTimezone;

  const defaultStartDate = moment().tz(timezone).startOf('day');
  const defaultEndDate = moment().tz(timezone).endOf('day');

  const [value, setValue] = useState<Date | Date[] | null | string>([
    defaultStartDate.toDate(),
    defaultEndDate.toDate(),
  ]);

  const getGoalAndActivities = async (start: any, end: any) => {
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

    const startMoment = moment(startISO).tz(timezone).startOf('day');
    const endMoment = moment(endISO).tz(timezone).endOf('day');

    dispatch(setStartDate(startMoment.toISOString()));
    dispatch(setEndDate(endMoment.toISOString()));

    getGoalAndActivities(startMoment, endMoment);
    setValue(newValue);

    // Close the popover by triggering a click on the button
    const popoverButton = document.getElementById('popover-button');
    if (popoverButton) {
      popoverButton.click();
    }
  };

  return { value, handleCalendarChange };
};
