import pool from "../config/db.js";

// **1. Insert Child Data**
export const createChild = async (childData) => {
  const { name, age, gender, location, photo, description, background, hobbies, personality, education, languages, aspirations } = childData;

  const query = `
    INSERT INTO children 
    (name, age, gender, location, photo, description, background, hobbies, personality, education, languages, aspirations) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
    RETURNING *;
  `;

  const values = [name, age, gender, location, photo, description, background, hobbies, personality, education, languages, aspirations];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// **2. Get All Children**
export const getAllChildren = async () => {
  const result = await pool.query("SELECT * FROM children");
  return result.rows;
};

// **3. Get Child by ID**
export const getChildById = async (id) => {
  const result = await pool.query("SELECT * FROM children WHERE id = $1", [id]);
  return result.rows[0];
};

// **4. Update Child Data**
export const updateChild = async (id, childData) => {
  const { name, age, gender, location, photo, description, background, hobbies, personality, education, languages, aspirations } = childData;

  const query = `
    UPDATE children 
    SET name=$1, age=$2, gender=$3, location=$4, photo=$5, description=$6, background=$7, 
    hobbies=$8, personality=$9, education=$10, languages=$11, aspirations=$12, updated_at=NOW() 
    WHERE id=$13 RETURNING *;
  `;

  const values = [name, age, gender, location, photo, description, background, hobbies, personality, education, languages, aspirations, id];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// **5. Delete Child**
export const deleteChild = async (id) => {
  await pool.query("DELETE FROM children WHERE id = $1", [id]);
  return { message: "Child deleted successfully" };
};
