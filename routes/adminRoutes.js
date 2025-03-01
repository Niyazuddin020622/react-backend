import express from "express";
import { registerAdmin, getAdmin, loginAdmin } from "../controllers/adminController.js"; 

const router = express.Router();

// Route for Admin Registration (POST)
router.post("/register", registerAdmin);

// Route for Admin Login (POST)
router.post("/login", loginAdmin);  // ✅ Login route added

// Route to Fetch Admin Data (GET)
router.get("/", getAdmin);  

export default router;
