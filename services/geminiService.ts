
import { GoogleGenAI } from "@google/genai";


let ai: GoogleGenAI | null = null;

try {
  // @ts-ignore
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  } else {
    console.warn("Gemini API Key is missing. Chat functionality will be disabled.");
  }
} catch (error) {
  console.error("Failed to initialize Gemini client:", error);
}

export const getUmKalthoumResponse = async (prompt: string, language: 'en' | 'ar') => {
  if (!ai) {
    return language === 'ar'
      ? "عذراً، خدمة المحادثة غير متوفرة حالياً (مفتاح API مفقود)."
      : "Sorry, chat service is currently unavailable (API Key missing).";
  }

  try {
    const model = ai.models.generateContent({
      model: 'gemini-2.0-flash',
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
    return response.text || (language === 'ar' ? "لم أتمكن من الرد." : "I could not generate a response.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'ar'
      ? "حدث خطأ أثناء الاتصال بالخدمة."
      : "An error occurred while connecting to the service.";
  }
};

