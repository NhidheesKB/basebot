import {SchemaInspector} from "knex-schema-inspector";
import { database } from "../config/connectDb.js";
import driver from "../driver/driver.js";
import { myprompt } from "../chat/prompt.js";
import { generateQuery } from "../chat/queryGeneration.js";
import { fetchData } from "../chat/getData.js";

export default async function handler(req, res) {
  if (req.method != "POST")
    return res.status(405).json({ message: "Method not alowed" });
  function stringData(data, startPosition, endPosition) {
    const start = data.indexOf(startPosition);
    const end = data.indexOf(endPosition) + 1;
    return data.slice(start, end);
  }
  try {
    const { connectionString, message, sslmode } = req.body;
    const server = connectionString?.split(":")[0];
    const client = driver[server];
    const db = database(connectionString, client, sslmode);
    const inspector = SchemaInspector(db);
    const schema = JSON.stringify(await inspector.columnInfo());
    const chatprompt = myprompt(schema);
    const response = (await generateQuery(chatprompt, message)).text;
    const prased = JSON.parse(stringData(response, "{", "}"));
    const query = prased.query;
    const aimessage = prased.message;
    if (!!aimessage) return res.status(200).json({ aimessage });
    const data = await fetchData(db, query);
    console.log("data",data)
    const start = data.indexOf("message") - 1;
    const tabledData = JSON.parse(stringData(data, "[", "]"));
    const tablemessage = data.slice(start)?.split('"')[3];
    return res.status(200).json({ tabledData, message: tablemessage });
  } catch (error) {
    console.log("chaterror", error);
    res.status(400).json({success:false})
  }
}
