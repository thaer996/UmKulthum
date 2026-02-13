
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getUmKalthoumResponse = async (prompt: string, language: 'en' | 'ar') => {
  const model = ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: `You are an expert historian specializing in the life and music of Um Kalthoum. 
      Respond in ${language === 'ar' ? 'Arabic' : 'English'}. 
      Be respectful, poetic, and highly factual. 
      If asked about her songs, provide names and brief emotional context. 
      Keep the tone elegant and sophisticated.`,
    },
  });
  
  const response = await model;
  return response.text;
};
