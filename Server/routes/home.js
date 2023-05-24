import express from "express";
import { getDefects  } from "../controllers/defects.js";
import { getComps } from "../controllers/components.js";

const router = express.Router();
router.get("/comps", getComps);
router.get("/defects", getDefects);
export default router;