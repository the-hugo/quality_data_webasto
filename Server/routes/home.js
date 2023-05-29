import express from "express";
import { getDefects, createDefect   } from "../controllers/defects.js";
import { getComps } from "../controllers/components.js";

const router = express.Router();
router.get("/comps", getComps);
router.get("/defects", getDefects);
router.post("/defects", createDefect);
export default router;