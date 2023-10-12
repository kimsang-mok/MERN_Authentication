import express from "express";
import { accountActivation } from "../controllers/accActivateController.js";

const router = express.Router();

router.route("/").post(accountActivation);

export default router;
