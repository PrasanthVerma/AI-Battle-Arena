import { createClient, type RedisClientOptions } from "redis";
import dotenv from "dotenv";
import { error } from "console";

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
  (options.socket as any).host = process.env.REDIS_HOST;
}

export const Redisclient = createClient(options);

Redisclient.on("error", (err) => console.error("Redis Client Error", err));
Redisclient.connect().catch(error);
