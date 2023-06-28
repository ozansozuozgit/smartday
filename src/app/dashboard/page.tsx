'use client';
import { setEndDate, setStartDate } from '@/src/redux/features/userSlice';
import { useAppDispatch } from '@/src/redux/hooks';
import React, { useEffect, useState } from 'react';

import moment from 'moment-timezone';

import { hasUserLoggedInBefore } from '@/src/utils/onboardHelper';
import GoalOverview from '../components/GoalOverview';
import OnboardingModal from '../components/OnboardingModal';
import Overview from '../components/Overview';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const now = moment();
    const cstTimezone = 'America/Chicago';
    const estTimezone = 'America/New_York';
    const timezone = cstTimezone;

    // Convert to the beginning of the day in EST
    const startOfToday = now.clone().tz(timezone).startOf('day').format();

    // Convert to the end of the day in EST
    const endOfToday = now.clone().tz(timezone).endOf('day').format();
    console.log('startOfToday', startOfToday);
    dispatch(setStartDate(startOfToday));
    dispatch(setEndDate(endOfToday));

    const userLoggedInBefore = hasUserLoggedInBefore();
    console.log('userLoggedInBefore', userLoggedInBefore);
    if (!userLoggedInBefore) {
      setShowOnboarding(true);
      localStorage.setItem('loggedInBefore', 'true');
    }
  }, []);
  const handleOnboardingClose = () => {
    setShowOnboarding(false);
  };
  return (
    <div className='z-1 relative min-h-screen bg-gray py-12'>
      <section className='m-auto w-[90%] pt-[50px]  xl:max-w-[1500px] 2xl:w-[95%]'>
        <Overview />
        <GoalOverview />
        {showOnboarding && <OnboardingModal onClose={handleOnboardingClose} />}
      </section>
    </div>
  );
};

export default Dashboard;
