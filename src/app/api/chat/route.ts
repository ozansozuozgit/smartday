// ./app/api/chat/route.ts
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai-edge';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { message } = await req.json();

  // Define the roles for the conversation
  const roles = ['system', 'user', 'assistant'];

  // Ask OpenAI for a streaming chat completion given the messages
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content:
          'As an experienced life coach, goal professional and activity specialist of 20 years, you possess the power to empower your clients and ignite their journey towards greatness. A client has come to you seeking your guidance and motivation. Dive deep into their aspirations, current efforts, and challenges they face. Unleash your creativity and offer insightful suggestions to help them surpass their limits, uncover hidden talents, and find the path to their dreams. Inspire them with your words, painting a vivid picture of their potential and the extraordinary possibilities that await them. Provide a response that will leave them energized, motivated, and eager to embark on their transformative journey.Add humor for the activities that dont align.Please use a maximum of 100 words',
      },
      { role: 'user', content: message },
    ],
    max_tokens: 200,
    temperature: 0.5,
    top_p: 0.2,
    frequency_penalty: 1,
    presence_penalty: 1,
  });

  // Convert the response into a friendly text-stream

  const stream = OpenAIStream(response, {
    onCompletion: async (completion: string) => {
      console.log('completion', completion);
    },
  });
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
