import {Configuration, OpenAIApi} from 'openai';

import {OPENAI_API_KEY} from '@env';
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const getMotivationalMessage = async (steps: number, mock = true) => {
  console.log('Requesting motiviation message from ChatGPT');
  if (mock) {
    return `Look at you go. ${steps} steps. That's like, so inspiring. #goals`;
  }
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: generatePrompt(steps),
    temperature: 0.6,
    max_tokens: 200,
  });

  return completion.data.choices[0].text?.replace(/"/g, '').trim();
};

function generatePrompt(steps: number, goal: number = 10000) {
  return `Create a message for someone who is trying to reach ${goal} steps per day. 

  The message must have an overly passive-aggressive and sarcastic tone.
  
  They're currently at ${steps} of ${goal} steps.`;
}

export const getBackgroundImage = async (mock = true) => {
  console.log('Requesting background image from OpenAI');
  if (mock) {
    return 'https://placehold.co/1024x1024.png';
  }
  const response = await openai.createImage({
    prompt:
      'abstract 3 layers of waves on a dark (colour #222) background with with light refracting through it, very cool subtle minimal dark illustration, purple light leak with subtle highlights',
    n: 1,
    size: '256x256',
  });
  return response.data.data[0].url;
};
