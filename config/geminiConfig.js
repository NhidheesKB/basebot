import { GoogleGenAI } from "@google/genai";

export const geminiai = new GoogleGenAI({
  apiKey: process.env.CHAT_API_KEY,
});