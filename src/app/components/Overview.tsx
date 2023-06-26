import { getBaseUrl } from '@/lib/getBaseUrl';
import { useAppSelector } from '@/src/redux/hooks';
import { getTimes } from '@/src/utils/timeHelpers';
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import AllAlignWithGoalPieChart from './AllAlignWithGoalPiechart';
import AllCategoryPieChart from './AllCategoryPieChart';
import CalendarChart from './CalendarChart';
const Overview = () => {
  const [allActivities, setAllActivities] = React.useState<any>(null);

  const startDate = useAppSelector((state) =>
    state.user.startDate
      ? moment(state.user.startDate).toISOString()
      : getTimes().startOfToday
  );
  const endDate = useAppSelector((state) =>
    state.user.endDate
      ? moment(state.user.endDate).toISOString()
      : getTimes().endOfToday
  );

  const fetchActivities = async (start: any, end: any) => {
    try {
      const res = await fetch(
        `${getBaseUrl()}/api/all-activities?startDate=${start}&endDate=${end}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchActivities(startDate, endDate).then(setAllActivities);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [startDate, endDate]);
  return (
    <div>
      <CalendarChart />
      <AllCategoryPieChart activities={allActivities} />
      <AllAlignWithGoalPieChart activities={allActivities} />
    </div>
  );
};

export default Overview;
