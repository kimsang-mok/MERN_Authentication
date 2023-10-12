import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import signupRoutes from "./routes/signupRoutes.js";
import morgan from "morgan";
dotenv.config();

const PORT = process.env.PORT || 3005;
const CLIENT_URL = process.env.CLIENT_URL;
const DATABASE = process.env.DATABASE;

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

mongoose
  .connect(DATABASE, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Connection Error", err));

if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: CLIENT_URL }));
}

app.use("/api/signup", signupRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
