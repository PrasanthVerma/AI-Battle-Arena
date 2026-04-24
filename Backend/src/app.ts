import express from "express";
import useGraph from "./services/graph.ai.service.js";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/auth.routes.js"; 
import cookieParser from "cookie-parser";
dotenv.config();

app.use(cors());
app.use(router);
app.use(express.json());
app.use(cookieParser());

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
