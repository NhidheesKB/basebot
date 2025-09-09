import { geminiai } from "../config/geminiConfig.js";

export const fetchData = async (db, query) => {
  try {
    const data = await db.raw(query);
    const textresponse = await geminiai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: {
        text: `You are a helpful AI assistant.
        I will give you some database rows. Your job:
        1. Return the rows exactly as provided, as a JSON array (do not change field names or values).
        2. Also generate a concise natural language description of what the data represents.

      The output must be in this JSON format:
      {
        "data": [...],     // array of table rows
        "message": "..."   // natural language description
      }
      The database rows are: ${JSON.stringify(data)}`,
      },
    });
    return textresponse.text;
  } catch (error) {}
};
