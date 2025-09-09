import { geminiai } from "../config/geminiConfig.js";

export const generateQuery = async (prompt,message) => {
  return await geminiai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: {
      role: "user",
      text: `You are a sql ai assistanant give me the raw query you need to give only the raw query as the output the out is only in json you don't give ans sentance if the user query is related to change something in db the acces only for readonly to db simpy say Add changes in db is not allowed in good sentance 
        My database schema is ${prompt} and my output format is belogs to when you have query then use this json format "{\"query\":\"\"}" otherwise use this json fromat "{\"message\":\"\"}"
        the output format is "{query:} or {message:""}" only dont give any sentace after that such as this query 
        The user query is ${message}`,
    },
  });
};
