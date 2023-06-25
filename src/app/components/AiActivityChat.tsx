'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { isToday } from '@/src/utils/timeHelpers';
import objectHash from 'object-hash';
import { useEffect, useState } from 'react';

export default function AiActivityChat({ goal }: any) {
  const [messages, setMessages] = useState<any>([]);
  const [messageCache, setMessageCache] = useState<{ [key: string]: string }>(
    {}
  );
  const fetchChatbotResponse = () => {
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
        ? `Out of these activities, the ones that align with this goal are: ${alignedActivities}.`
        : ``
    } ${
      unalignedActivities
        ? `The activities that dont align with my daily goal are: ${unalignedActivities}.`
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
        const cacheKey = `${goal.id}-${objectHash(goal.activities)}`;
        setMessageCache((prevCache) => ({
          ...prevCache,
          [cacheKey]: receivedText,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // Create a unique cache key for the current goal and its activities
    const cacheKey = `${goal.id}-${objectHash(goal.activities)}`;

    if (!goal || goal.activities.length === 0) {
      setMessages([]);
    } else if (messageCache[cacheKey]) {
      setMessages([messageCache[cacheKey]]);
    } else {
      fetchChatbotResponse();
    }
  }, [goal, goal.activities]);

  return (
    <div className='flex max-w-full sm:max-w-xl h-[500px] flex-col p-6 mx-auto bg-white rounded-lg shadow-md w-[550px]'>
      <h2 className='text-2xl font-semibold text-gray-900 mb-4 font-roboto'>
        AI Chat Bot Response
      </h2>
      <div className='max-h-96 overflow-y-auto'>
        {messages[0]?.length &&
          messages[0].split('. ').map((sentence: any, index: number) => (
            <p
              key={index}
              className='mb-4 text-gray-600 leading-6 font-open_sans'
            >
              {sentence.trim()}
              {index !== messages[0].split('. ').length - 1 ? '.' : ''}
            </p>
          ))}
      </div>
    </div>
  );
}
