'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { useAppSelector } from '@/src/redux/hooks';
import { isToday } from '@/src/utils/timeHelpers';
import { useEffect, useState } from 'react';
import { PiRobotBold } from 'react-icons/pi';

export default function AiActivityChat({ goal }: any) {
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false); // New state for loading indicator
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const activityFlag = useAppSelector((state) => state.user.activityFlag);
  const startDate = useAppSelector((state) => state.user.startDate);
  const endDate = useAppSelector((state) => state.user.endDate);

  const fetchChatbotResponse = () => {
    setLoading(true);

    if (goal.activities.length === 0) {
      setMessages([]);
      return;
    }

    const goalName = goal?.name || 'N/A';
    const goalPercentage = goal?.percentage || 0;
    const goalActivities = goal?.activities || [];
    const todayActivities = goalActivities.filter((activity: any) =>
      isToday(activity.createdAt)
    );

    const allActivities = todayActivities
      .map((activity: any) => activity.name)
      .join(', ');

    if (allActivities.length === 0) return;

    const alignedActivities = todayActivities
      .filter((activity: any) => activity.alignsWithGoal)
      .map((activity: any) => activity.name)
      .join(', ');
    const unalignedActivities = todayActivities
      .filter((activity: any) => !activity.alignsWithGoal)
      .map((activity: any) => activity.name)
      .join(', ');

    const message = `My daily goal is: ${goalName} and I am ${goalPercentage}% complete with my daily goal. My daily activities towards this goal so far have been: ${allActivities}.${
      alignedActivities
        ? ` Out of these activities, the ones that align with this goal are: ${alignedActivities}.`
        : ''
    }${
      unalignedActivities
        ? ` The activities that don't align with my daily goal are: ${unalignedActivities}.`
        : ''
    } Please evaluate my progress and provide suggestions to help me achieve my goal effectively.`;

    fetch(`${getBaseUrl()}/api/chat`, {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((receivedText) => {
        setMessages([receivedText]);
        setLoading(false);

        fetch(
          `${getBaseUrl()}/api/aimessages?startDate=${startDate}&endDate=${endDate}`,
          {
            method: 'POST',
            body: JSON.stringify({
              message: receivedText,
              goalId: goal.id,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!goal || goal.activities.length === 0) {
      setMessages([]);
    } else {
      fetch(
        `${getBaseUrl()}/api/aimessages?goalId=${
          goal.id
        }&startDate=${startDate}&endDate=${endDate}`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res && res.message) {
            setMessages([res.message]);
          } else {
            // If no message exists in the database, generate a new one
            fetchChatbotResponse();
          }
        });
    }
  }, [goal, goal.activities]);

  useEffect(() => {
    if (!initialLoad) {
      fetchChatbotResponse();
    }
    setInitialLoad(false);
  }, [activityFlag]);

  return (
    <div className='flex h-[400px] w-full flex-col self-center rounded-xl bg-white p-4 px-8 shadow-md'>
      <h2 className='text-md sm:text-md mb-2 flex items-start gap-x-2 font-roboto font-semibold sm:mb-2 md:text-xl'>
        <PiRobotBold className='h-7 w-8 text-teal-500' />
        AI Coach
      </h2>
      <div className='mt-5 max-h-96 overflow-y-auto'>
        {loading ? ( // Show skeleton loader if loading state is true
          <div className='flex w-full flex-1 flex-col items-center'>
            <div className='mt-12 w-full animate-pulse flex-row items-center justify-center space-x-1'>
              <div className='flex flex-col space-y-2'>
                <div className='bg-gray h-[50px] rounded-md'></div>
                <div className='bg-gray h-[50px] w-10/12 rounded-md'></div>
                <div className='bg-gray h-[50px] w-9/12 rounded-md'></div>
                <div className='bg-gray h-[50px] w-9/12 rounded-md'></div>
                <div className='bg-gray h-[50px] w-9/12 rounded-md'></div>
              </div>
            </div>
          </div>
        ) : (
          messages[0]?.length &&
          messages[0].split('. ').map((sentence: any, index: number) => (
            <p key={index} className='text-md mb-4 font-open_sans leading-7'>
              {sentence.trim()}
              {index !== messages[0].split('. ').length - 1 ? '.' : ''}
            </p>
          ))
        )}
      </div>
    </div>
  );
}
