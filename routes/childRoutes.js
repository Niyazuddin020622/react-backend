import express from "express";
import { getChildren, getChildById, addChild, updateChild, deleteChild } from "../controllers/childController.js";

const router = express.Router();

// ✅ Routes connected with controllers
router.get("/", getChildren); // Fetch all children
router.get("/:id", getChildById); // Fetch single child by ID
router.post("/", addChild); // Add a new child
router.put("/:id", updateChild); // Update child details
router.delete("/:id", deleteChild); // Delete child

export default router;
