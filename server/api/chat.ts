import { streamText } from 'ai';
import { createGoogleGenerativeAI, GoogleGenerativeAIProviderOptions } from '@ai-sdk/google';

export default defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().geminiapikey;
  if (!apiKey) throw new Error('api key bs');
  const google = createGoogleGenerativeAI({
    apiKey: apiKey,
  });

  return defineEventHandler(async (event: any) => {
    const { messages } = await readBody(event);

    const result = streamText({
        model: google('gemini-2.0-flash'),
        providerOptions: {
            google: {
                thinkingConfig: {
                    thinkingBudget: 2048,
                },
                responseModalities: ['TEXT', 'IMAGE'],
            } satisfies GoogleGenerativeAIProviderOptions,
        },
      messages,
    });

    return result.toDataStreamResponse();
  });
});