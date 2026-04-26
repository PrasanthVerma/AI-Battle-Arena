import { createClient, RedisClientOptions } from "redis";
import dotenv from "dotenv";

dotenv.config();

const options: RedisClientOptions = {
  socket: {
    port: parseInt(process.env.REDIS_PORT || "12301")
  }
};

if (process.env.REDIS_PASSWORD) {
  options.password = process.env.REDIS_PASSWORD;
}

if (process.env.REDIS_HOST) {
  options.socket!.host = process.env.REDIS_HOST;
}

export const Redisclient = createClient(options);

Redisclient.on("error", (err) => console.error("Redis Client Error", err));
Redisclient.connect().catch(console.error);
