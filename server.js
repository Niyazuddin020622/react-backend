//this is use for pdAdmin
import express from "express";
import cors from "cors";
import childRoutes from "./routes/childpgadminRoutes.js";
import pool from "./config/database.js"; // ✅ Importing pool properly

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/children", childRoutes);

// Database Connection Test
pool.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("Database connection error:", err));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
