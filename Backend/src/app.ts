import express from "express";
// import useGraph from "./services/graph.ai.service.js";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import { RedisStore } from "connect-redis";
import { Redisclient } from "./config/redis.js";
import "./config/passport.js";
import helmet from "helmet";
import morgan from "morgan";
import { ArenaController } from "./Controllers/arena.controller.js";
import { GetChatsController, GetChatMessagesController } from "./Controllers/arena.controller.js"



dotenv.config();

const app = express();
app.set("trust proxy", 1); // Trust Render proxy for secure cookies
app.use(morgan("dev"));
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ========== MIDDLEWARE SETUP ==========
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// ========== SESSION MIDDLEWARE (BEFORE ROUTES) ==========
app.use(
  session({
    store: new RedisStore({ client: Redisclient }),
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  }),
);

// ========== PASSPORT MIDDLEWARE ==========
app.use(passport.initialize());
app.use(passport.session());

// ========== ROUTES ==========
app.use("/api/auth", router);

app.post("/api/use-graph", ArenaController);
app.get("/api/chats", GetChatsController);
app.get("/api/chats/:chatId", GetChatMessagesController);

export default app;
