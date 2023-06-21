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
          'As a knowledgeable and experienced life coach, you have the expertise to guide your clients towards their goals. A user has reached out to you seeking guidance. They have a specific goal in mind and have been engaging in various activities. Assess their progress and provide personalized suggestions to enhance their journey. I would appreciate brief answers to my inquiries. Please use a maximum of 100 words per response.',
      },
      { role: 'user', content: message },
    ],
    max_tokens: 100,
    temperature: 0.5,
    top_p: 0.5,
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
