import express from "express";
import pool from "../config/database.js"; // Import PostgreSQL connection

const router = express.Router();

// 🟢 Fetch all children with optional filters
router.get("/", async (req, res) => {
    let { gender, ageGroup, location } = req.query;
    let query = "SELECT * FROM children WHERE 1=1"; // Base query
    let values = [];

    if (gender) {
        values.push(gender);
        query += ` AND gender = $${values.length}`;
    }

    if (location) {
        values.push(`%${location}%`);
        query += ` AND location ILIKE $${values.length}`;
    }

    if (ageGroup) {
        if (ageGroup === "infant") query += ` AND age BETWEEN 0 AND 2`;
        if (ageGroup === "toddler") query += ` AND age BETWEEN 2 AND 5`;
        if (ageGroup === "teen") query += ` AND age >= 6`;
    }

    try {
        const { rows } = await pool.query(query, values);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch children" });
    }
});

// 🟢 Fetch a single child by ID
router.get("/:id", async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM children WHERE id = $1", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: "Child not found" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 🟢 Add a new child
router.post("/", async (req, res) => {
    const { name, age, gender, location, photo, description, background, hobbies, personality, education, languages, aspirations } = req.body;

    if (!name || !age || !gender || !location || !photo || !description || !background || !education || !aspirations) {
        return res.status(400).json({ message: "All required fields must be filled" });
    }

    try {
        const { rows } = await pool.query(
            `INSERT INTO children (name, age, gender, location, photo, description, background, hobbies, personality, education, languages, aspirations)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
            [name, age, gender, location, photo, description, background, hobbies, personality, education, languages, aspirations]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 🟢 Update child details
router.put("/:id", async (req, res) => {
    try {
        const { rows } = await pool.query(
            `UPDATE children SET name=$1, age=$2, gender=$3, location=$4, photo=$5, description=$6, background=$7, hobbies=$8, personality=$9, education=$10, languages=$11, aspirations=$12 
             WHERE id=$13 RETURNING *`,
            [...Object.values(req.body), req.params.id]
        );

        if (rows.length === 0) return res.status(404).json({ message: "Child not found" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 🟢 Delete a child
router.delete("/:id", async (req, res) => {
    try {
        const { rowCount } = await pool.query("DELETE FROM children WHERE id = $1", [req.params.id]);
        if (rowCount === 0) return res.status(404).json({ message: "Child not found" });
        res.json({ message: "Child deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
