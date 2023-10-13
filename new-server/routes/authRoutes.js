import express from "express";
import * as authController from "../controllers/authController.js";
import { loginValidator, signupValidator } from "../validators/auth.js";
import { runValidation } from "../validators/index.js";

const router = express.Router();

router.post("/signup", signupValidator, runValidation, authController.signup);
router.route("/account-activate").post(authController.accountActivation);
router.post("/login", loginValidator, runValidation, authController.login);

export default router;
