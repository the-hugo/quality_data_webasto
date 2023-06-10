import express from "express";
import {
  getDefects,
  createDefect,
  deleteDefect,
  editDefect
} from "../controllers/defect.js";
import { getComps, editComp, deleteComp, createComp} from "../controllers/components.js";
import {
  createUser,
  deleteUser,
  editUser,
  loginUser
} from "../controllers/users.js";
import {
  createProduct,
  deleteProduct,
  editProduct,
  findProductBySerialNumber
} from "../controllers/product.js";
import {
  createLocation,
  deleteLocation,
  editLocation
} from "../controllers/location.js";

const router = express.Router();

// Component routes
router.get("/comps", getComps);
router.post("/comps", createComp);
router.put("/comps/:id", editComp);
router.delete("/comps/:id", deleteComp);

// Defect routes
router.get("/defects", getDefects);
router.post("/defects", createDefect);
router.put("/defects/:id", editDefect);
router.delete("/defects/:id", deleteDefect);

// User routes
router.post("/users", createUser);
router.put("/users/:id", editUser);
router.delete("/users/:id", deleteUser);
router.post("/login", loginUser);

// Product routes
router.post("/products", createProduct);
router.put("/products/:id", editProduct);
router.delete("/products/:id", deleteProduct);
router.get('/products/:serialNumber', findProductBySerialNumber);

// Location routes
router.post("/locations", createLocation);
router.put("/locations/:id", editLocation);
router.delete("/locations/:id", deleteLocation);


export default router;
