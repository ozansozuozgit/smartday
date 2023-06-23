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
          `Drawing on your coaching experience and humorous outlook, delve into your client's goals and challenges. Infuse humor into your advice, helping them transcend limits, uncover talents, and tread the path to their dreams. Craft a response that's as laughter-inducing as it is enlightening. Be strict, but also mindful. Please use a maximum of 100 words`,
      },
      { role: 'user', content: message },
    ],
    max_tokens: 200,
    temperature: 0.8,
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
