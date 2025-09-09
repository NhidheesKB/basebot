import axios from "axios";
import { database } from "../config/connectDb.js";
import driver from "../driver/driver.js";

export default async function handler(req, res) {
  if (req.method != "POST")
    return res.status(405).json({ message: "Method not alowed" });
  try {
    const { connectionString,sslmode } = req.body;
    const server=connectionString?.split(':')[0]
    const client=driver[server]
    const db=database(connectionString,client,sslmode)
    const isconnect = await db.raw("SELECT 1+1 as result");
    res.status(200).json({ success: true, message: "Connection Established Sucessfully" });
  } catch (error) {
    console.log("aydapierror", error);
    res.status(404).json({ success: false, message: "Invalid Credentials" });

  }
};
  