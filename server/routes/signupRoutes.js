import express from "express";
import * as signupController from "../controllers/signupController.js";
import { userSignupValidator } from "../validators/auth.js";
import { runValidation } from "../validators/index.js";

const router = express.Router();

router
  .route("/")
  .post(userSignupValidator, runValidation, signupController.signup);

export default router;
