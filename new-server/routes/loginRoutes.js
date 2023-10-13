import express from "express";
import { login } from "../controllers/loginController.js";
import { loginValidator } from "../validators/auth.js";
import { runValidation } from "../validators/index.js";

const router = express.Router();

router.route("/").post(loginValidator, runValidation,login);

export default router;
