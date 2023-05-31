import express from "express";
import { getDefects, createDefect, deleteDefect, editDefect   } from "../controllers/defects.js";
import { getComps } from "../controllers/components.js";

const router = express.Router();
router.get("/comps", getComps);
router.get("/defects", getDefects);
router.post("/defects", createDefect);
router.put("/defects/:id", editDefect);
router.delete("/defects/:id", deleteDefect);
export default router;