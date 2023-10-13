import express from "express";
import { signup } from "../controllers/signupController.js";
import { runValidation } from "../validators/index.js";
import { signupValidator } from "../validators/auth.js";

const router = express.Router();

router.route("/").post(signupValidator, runValidation, signup);

export default router;
