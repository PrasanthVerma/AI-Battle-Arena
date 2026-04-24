import express from "express";
import useGraph from "./services/graph.ai.service.js";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
dotenv.config();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(router);

app.use("/api/auth", router);

app.get("/use-graph", async (req, res) => {
  try {
    const result = await useGraph(
      "write a code to sort an array of integers in ascending order",
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
});

export default app;
