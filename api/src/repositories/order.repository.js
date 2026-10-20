const pool = require("../config/db");

const orderColumns = `
    order_id AS id,
    product_id AS "productId",
    quantity,
    unit_price::float AS "unitPrice"
`;

const findAll = async () => {
  const result = await pool.query(`
        SELECT ${orderColumns}
        FROM orders
        ORDER BY order_id
    `);

  return result.rows;
};

const findById = async (id) => {
  const result = await pool.query(
    `
        SELECT ${orderColumns}
        FROM orders
        WHERE order_id = $1
    `,
    [id],
  );

  return result.rows[0];
};

const findByIdForUpdate = async (client, id) => {
  const result = await client.query(
    `
        SELECT ${orderColumns}
        FROM orders
        WHERE order_id = $1
        FOR UPDATE
    `,
    [id],
  );

  return result.rows[0];
};

const findProductForUpdate = async (client, id) => {
  const result = await client.query(
    `
        SELECT id, price, quantity
        FROM products
        WHERE id = $1
        FOR UPDATE
    `,
    [id],
  );

  return result.rows[0];
};

const create = async (client, order) => {
  const { productId, quantity, unitPrice } = order;

  const result = await client.query(
    `
        INSERT INTO orders (
            product_id, quantity, unit_price
        )
        VALUES ($1, $2, $3)
        RETURNING ${orderColumns}
    `,
    [productId, quantity, unitPrice],
  );

  return result.rows[0];
};

const update = async (client, id, order) => {
  const { productId, quantity, unitPrice } = order;

  const result = await client.query(
    `
        UPDATE orders
        SET product_id = $1,
            quantity = $2,
            unit_price = CASE
                WHEN product_id = $1 THEN unit_price
                ELSE $3
            END
        WHERE order_id = $4
        RETURNING ${orderColumns}
    `,
    [productId, quantity, unitPrice, id],
  );

  return result.rows[0];
};

const changeStock = async (client, productId, difference) => {
  await client.query(
    `
        UPDATE products
        SET quantity = quantity + $1
        WHERE id = $2
    `,
    [difference, productId],
  );
};

const remove = async (client, id) => {
  const result = await client.query(
    `
        DELETE FROM orders
        WHERE order_id = $1
        RETURNING ${orderColumns}
    `,
    [id],
  );

  return result.rows[0];
};

module.exports = {
  findAll,
  findById,
  findByIdForUpdate,
  findProductForUpdate,
  create,
  update,
  changeStock,
  remove,
};
