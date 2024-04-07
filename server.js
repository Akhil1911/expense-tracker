import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/authRoute.js";
import hisabRoutes from "./routes/hisabRoute.js";
import path from "path";
import { fileURLToPath } from "url";

//config env file
dotenv.config();

//initalizing
const app = express();

//connect DB
connectDB();

//middlewares;
app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/hisab", hisabRoutes);

//static build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//PORT
const PORT = 1911 || process.env.PORT;

//listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
