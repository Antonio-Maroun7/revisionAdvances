const pool = require("../config/db");

const findAllProducts = async () => {
  const result = await pool.query(
    `SELECT 
          id,
          name,
          description,
          price,
          quantity,
          created_at
         FROM products
           ORDER BY id;
         `,
  );
  return result.rows;
};

const findProductById = async (id) => {
  const result = await pool.query(
    `SELECT 
        id,
        name,
        description,
        price,
        quantity,
        created_at
        FROM products
        WHERE id=$1`,
    [id],
  );
  return result.rows[0];
};

const createProduct = async (product) => {
  const { name, description, price, quantity } = product;
  const result = await pool.query(
    `INSERT INTO products
        (name,description,price,quantity)
        VALUES($1,$2,$3,$4)
        RETURNING *`,
    [name, description, price, quantity],
  );
  return result.rows[0];
};

const updateProduct = async (id, product) => {
  const { name, description, price, quantity } = product;
  const result = await pool.query(
    `UPDATE products
        SET
        name=$1,
        description=$2,
        price=$3,
        quantity=$4
        WHERE id=$5
        RETURNING *`,
    [name, description, price, quantity, id],
  );
  return result.rows[0];
};

const deleteProduct = async (id) => {
  const result = await pool.query(
    `DELETE FROM products
        WHERE id = $1
        RETURNING *`,
    [id],
  );
  return result.rows[0];
};

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
