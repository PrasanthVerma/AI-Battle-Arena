import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const host = process.env.REDIS_HOST || "127.0.0.1";
const port = process.env.REDIS_PORT || "6379";
const password = process.env.REDIS_PASSWORD;
const useTLS = process.env.REDIS_TLS === "true";

// Build a redis:// URL — the most reliable way to configure redis v5.x
// redis[s]://:password@host:port
const protocol = useTLS ? "rediss" : "redis";
const url = password
  ? `${protocol}://:${encodeURIComponent(password)}@${host}:${port}`
  : `${protocol}://${host}:${port}`;

export const Redisclient = createClient({
  url,
  socket: {
    // redis v5: connectTimeout must be inside socket (ms)
    connectTimeout: 10000,
    keepAlive: 5000,
    ...(useTLS && { rejectUnauthorized: false }),
    reconnectStrategy: (retries: number) => {
      if (retries > 5) {
        console.error("Redis: max reconnect attempts reached, giving up.");
        return false;
      }
      return Math.min(retries * 500, 3000);
    },
  },
});

Redisclient.on("error", (err: any) => console.error("Redis Client Error", err));
Redisclient.connect().catch((err: any) =>
  console.error("Redis Connection Error", err)
);
