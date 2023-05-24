import express from "express";
import { getDefects  } from "../controllers/defects.js";

const router = express.Router();

router.get("/", getDefects);

export default router;