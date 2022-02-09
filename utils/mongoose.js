import { connect, connection } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// initially connection nai
const conn = { isConnected: false };

// connectionn established kora
export async function dbConnect() {
  if (conn.isConnected) return;
  const db = await connect(process.env.MONGODB_URI);
  conn.isConnected = db.connections[0].readyState;
}

connection.on("connected", () => {
  console.log("Mongodb is Connected");
});

connection.on("error", (err) => {
  console.log("Mongodb is Connection failed with,", err.message);
});
