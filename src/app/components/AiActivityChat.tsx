'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { useEffect, useState } from 'react';
export default function AiActivityChat({ goal }: any) {
  console.log('goal', goal);
  console.log('activities', goal?.activities);
  const [messages, setMessages] = useState<any>([]);
  //   const message = 'Hello, Please help me';

  const fetchChatbotResponse = () => {
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
      {/* {messages.length > 0
        ? messages.map((m) => (
            <div key={m.id} className='whitespace-pre-wrap'>
              {m.role === 'user' ? 'User: ' : 'AI: '}
              {m.content}
            </div>
          ))
        : null}

      <form onSubmit={handleSubmit}>
        <input
          className='fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl'
          value={input}
          placeholder='Say something...'
          onChange={handleInputChange}
        />
      </form> */}
      <p>{messages}</p>
    </div>
  );
}
