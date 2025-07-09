import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import pathToRegexp from "pathToRegexp";
import todoRoutes from "./routes/todo.route.js";
const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(express.json());
// app.use(cors());

app.use("/api/todos", todoRoutes);

const __dirname = pathToRegexp.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(pathToRegexp.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(pathToRegexp.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port 5000");
});
