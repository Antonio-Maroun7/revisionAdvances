const pool = require("../config/db");

const findAllUsers = async () => {
  const result = await pool.query(`
    SELECT
     id, 
        first_name, 
        last_name, 
        email, 
        age, 
        created_at 
    FROM users ORDER BY id;`);
  return result.rows;
};

const findUserById = async (id) => {
  const result = await pool.query(
    `SELECT
       id,
       first_name,
       last_name,
       email,
       age,
       created_at
     FROM users 
     WHERE id=$1`,
    [id],
  );
  return result.rows[0];
};

const create = async (user) => {
  const { first_name, last_name, email, age } = user;
  const result = await pool.query(
    `
    INSERT INTO users
    (first_name,last_name,email,age)
    values ($1,$2,$3,$4)
    RETURNING *`,
    [first_name, last_name, email, age],
  );

  return result.rows[0];
};

const updateUser = async (id, user) => {
  const { first_name, last_name, email, age } = user;
  const result = await pool.query(
    `UPDATE users
    SET first_name=$1,
    last_name=$2,
    email=$3,
    age=$4
    WHERE id=$5
    RETURNING *`,
    [first_name, last_name, email, age, id],
  );
  return result.rows[0];
};

const deleteUser = async (id) => {
  const result = await pool.query(
    `DELETE FROM users 
    WHERE id = $1
    RETURNING *`,
    [id],
  );
  return result.rows[0];
};

module.exports = {
  findAllUsers,
  findUserById,
  create,
  updateUser,
  deleteUser,
};
