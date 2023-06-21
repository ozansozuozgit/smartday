'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { useEffect, useState } from 'react';
export default function AiActivityChat({ goal }: any) {
  console.log('goal', goal);
  console.log('activities', goal?.activities);
  const [messages, setMessages] = useState<any>([]);
  //   const message = 'Hello, Please help me';

  const fetchChatbotResponse = () => {
    if(goal.activities.length === 0) return;
    setMessages([]);
    const message = `My goal is:${goal?.name} and I am ${
      goal?.percentage
    }% complete. My daily activities to achieve this goal are: ${goal?.activities
      ?.map((activity: any) => activity?.name)
      .join(
        ', '
      )}. Out of these activities, the ones that align with this goal are ${goal?.activities
      ?.filter((activity: any) => activity?.alignsWithGoal)
      .map((activity: any) => activity?.name)
      .join(', ')}.Please evaluate my progress and provide suggestions to help me achieve my goal effectively.`;

    console.log('message', message);
    fetch(`${getBaseUrl()}/api/chat`, {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.body)
      .then((body) => {
        const reader = body?.getReader();
        const decoder = new TextDecoder();
        const receivedChunks: any = [];

        const processChunk = () => {
          reader?.read().then(({ done, value }) => {
            if (done) {
              // Stream finished
              const receivedText = receivedChunks.join('');
              // Do something with receivedText, e.g., update state
              setMessages((prevMessages: any) => [
                ...prevMessages,
                receivedText,
              ]);
              console.log(receivedText);
              return;
            }

            const chunk = decoder.decode(value, { stream: true });
            receivedChunks.push(chunk);
            processChunk();
          });
        };

        processChunk();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (!goal || !goal.activities) return;
    fetchChatbotResponse();
  }, [goal]);
  
  return (
    <div className='flex flex-col w-full max-w-md py-24 mx-auto stretch'>
      <p>{messages}</p>
    </div>
  );
}
