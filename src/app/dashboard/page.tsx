'use client';
import {
  setEndDate,
  setStartDate,
  setUserAuth,
} from '@/src/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
// import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Activities from '../components/Activities';
// import BarChart from '../components/BarChart';
// import {
//   ClerkProvider,
//   SignedOut,
//   useAuth,
//   useUser,
// } from '@clerk/nextjs';
import moment from 'moment-timezone';
import AiActivityChat from '../components/AiActivityChat';
import AlignWithGoalPieChart from '../components/AlignWithGoalPieChart';
import CalendarChart from '../components/CalendarChart';
import CalendarChartSingle from '../components/CalendarChartSingle';
import ChartLine from '../components/ChartLine';
import DatePicker from '../components/DatePicker';
import PieChart from '../components/PieChart';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const selectedGoal = useAppSelector((state) => state.user.selectedGoal);

  useEffect(() => {
    const now = moment();
    const cstTimezone = 'America/Chicago';
    const estTimezone = 'America/New_York';
    const timezone = cstTimezone;

    // Convert to the beginning of the day in EST
    const startOfToday = now.clone().tz(timezone).startOf('day').format();

    // Convert to the end of the day in EST
    const endOfToday = now.clone().tz(timezone).endOf('day').format();
    dispatch(setStartDate(startOfToday));
    dispatch(setEndDate(endOfToday));
  }, []);

  return (
    <div>
      <section className='bg-gray pl-5 pt-[50px] font-montserrat'>
        {selectedGoal && (
          <h3 className='text-xl font-bold'>
            {selectedGoal?.name}
          </h3>
        )}
        <DatePicker />
        {selectedGoal && <Activities goal={selectedGoal} />}
        {selectedGoal && <ChartLine goal={selectedGoal} />}
        {selectedGoal && <PieChart goal={selectedGoal} />}
        {selectedGoal && <AlignWithGoalPieChart goal={selectedGoal} />}
        {!selectedGoal && <CalendarChart />}
        {selectedGoal && <CalendarChartSingle goal={selectedGoal} />}
        {selectedGoal && <AiActivityChat goal={selectedGoal} />}
      </section>
    </div>
  );
};

export default Dashboard;
