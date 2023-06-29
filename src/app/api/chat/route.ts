// ./app/api/chat/route.ts
import { OpenAIStream, StreamingTextResponse } from 'ai';
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
        content: `Drawing on your coaching experience and humorous outlook, delve into your client's goals and challenges. Infuse humor into your advice, helping them transcend limits, uncover talents, and tread the path to their dreams. Craft a response that's as laughter-inducing as it is enlightening. Be strict, but also mindful.Make the client feel they are heard. The client does not have to have every activity align with their goal, just encourage them to have it aligned as much as possible. If the client has reached 100% completion of their goal, even if not all their activities align with the goal, celebrate them as much as you can and acknowledge that they had completed their goal. Give advice that is actionable and often provide unique insights. Please use a maximum of 200 words`,
      },
      { role: 'user', content: message },
    ],
    max_tokens: 500,
    temperature: 0.8,
    top_p: 0.5,
    frequency_penalty: 2,
    presence_penalty: 2,
  });

  const stream = OpenAIStream(response, {
    onCompletion: async (completion: string) => {
      console.log('completion', completion);
    },
  });
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
