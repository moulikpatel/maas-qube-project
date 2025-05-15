import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connectDb.js";
import authrouter from "./routes/authRoutes.js";
import bookRouter from "./routes/bookRoutes.js";
import cors from "cors"
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

connectDb();
app.use(cors());
app.use(express.json());

app.use("/auth",authrouter)
app.use("/book",bookRouter)

app.listen(PORT, () => {
  console.log("Server runing on port =>", PORT);
});
