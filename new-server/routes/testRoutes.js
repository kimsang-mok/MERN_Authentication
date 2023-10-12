import express from "express";
import * as testController from "../controllers/testController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(auth, testController.test);

export default router;
