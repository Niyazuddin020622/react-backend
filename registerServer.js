require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection setup
const pool = new Pool({
  user: "postgres", // Replace with your PostgreSQL username
  host: "localhost",
  database: "childAdoption", // Replace with your database name
  password: "Niyazu020622", // Replace with your database password
  port: 5432, // Default PostgreSQL port
});

// API Route for User Registration
app.post("/register", async (req, res) => {
  try {
    const { fullName, dob, gender, email, password, city, mobile, reason } = req.body;

    // Check if email or mobile already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR mobile = $2",
      [email, mobile]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email or mobile already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into PostgreSQL
    const result = await pool.query(
      `INSERT INTO users (full_name, dob, gender, email, password, city, mobile, reason) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [fullName, dob, gender, email, hashedPassword, city, mobile, reason]
    );

    res.status(201).json({ message: "User registered successfully!", user: result.rows[0] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
