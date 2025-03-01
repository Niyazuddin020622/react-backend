import pkg from "pg"; 
const { Pool } = pkg; // Correct way to use pg in ES Module

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "childAdoption",
  password: "Niyazu020622",
  port: 5432, // Default PostgreSQL port
});

export default pool; // ✅ Ensure default export
