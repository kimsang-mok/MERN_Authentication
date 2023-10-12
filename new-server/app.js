import express from "express";
import mongoose from "mongoose";
import signupRoute from "./routes/signupRoutes.js";
import testRoute from "./routes/testRoutes.js";
import loginRoute from "./routes/loginRoutes.js";
import accActivateRoute from "./routes/accActivateRoutes.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();
app.use(express.json());

mongoose
  .connect(MONGODB_URI, {})
  .then(() => console.log("Connected to MongoDB database"))
  .catch((err) => console.log("Database connection error!", err));

if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: CLIENT_URL }));
  app.use(morgan("dev"));
}

app.use("/api/login", loginRoute);
app.use("/api/signup", signupRoute);
app.use("/api/account-activation/", accActivateRoute);
app.use("/test", testRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
