const pool = require("../config/db");
const orderRepository = require("../repositories/order.repository");
const { isValidId } = require("../validators/order.validator");

const makeError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const checkOrderId = (id) => {
  if (!isValidId(id)) {
    throw makeError(404, "Order not found");
  }
};

const getAllOrders = async () => {
  return await orderRepository.findAll();
};

const getOrderById = async (id) => {
  checkOrderId(id);

  const order = await orderRepository.findById(id);

  if (!order) {
    throw makeError(404, "Order not found");
  }

  return order;
};

const createOrder = async (order) => {
  const { productId, quantity } = order;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const product = await orderRepository.findProductForUpdate(
      client,
      productId,
    );

    if (!product) {
      throw makeError(404, "Product not found");
    }

    if (product.quantity < quantity) {
      throw makeError(409, "Insufficient product stock");
    }

    // Reserve the ordered quantity.
    await orderRepository.changeStock(client, productId, -quantity);

    // Price is retrieved from the product.
    const newOrder = await orderRepository.create(client, {
      productId,
      quantity,
      unitPrice: product.price,
    });

    await client.query("COMMIT");

    return newOrder;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const updateOrder = async (id, order) => {
  checkOrderId(id);

  const { productId, quantity } = order;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const existingOrder = await orderRepository.findByIdForUpdate(client, id);

    if (!existingOrder) {
      throw makeError(404, "Order not found");
    }

    const oldProductId = existingOrder.productId;
    const oldQuantity = existingOrder.quantity;

    // Lock products in a consistent order.
    const productIds = [...new Set([oldProductId, productId])].sort(
      (a, b) => a - b,
    );

    const lockedProducts = new Map();

    for (const pid of productIds) {
      const product = await orderRepository.findProductForUpdate(client, pid);

      if (!product) {
        throw makeError(404, "Product not found");
      }

      lockedProducts.set(pid, product);
    }

    const newProduct = lockedProducts.get(productId);

    if (oldProductId === productId) {
      // Only the quantity has changed.
      const difference = quantity - oldQuantity;

      if (difference > 0 && newProduct.quantity < difference) {
        throw makeError(409, "Insufficient product stock");
      }

      if (difference !== 0) {
        await orderRepository.changeStock(client, productId, -difference);
      }
    } else {
      // A different product was selected.
      if (newProduct.quantity < quantity) {
        throw makeError(409, "Insufficient product stock");
      }

      // Restore the stock of the previous product.
      await orderRepository.changeStock(client, oldProductId, oldQuantity);

      // Reserve stock for the new product.
      await orderRepository.changeStock(client, productId, -quantity);
    }

    const updatedOrder = await orderRepository.update(client, id, {
      productId,
      quantity,
      unitPrice: newProduct.price,
    });

    await client.query("COMMIT");

    return updatedOrder;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const deleteOrder = async (id) => {
  checkOrderId(id);

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const order = await orderRepository.findByIdForUpdate(client, id);

    if (!order) {
      throw makeError(404, "Order not found");
    }

    // Lock the product before restoring stock.
    const product = await orderRepository.findProductForUpdate(
      client,
      order.productId,
    );

    if (!product) {
      throw makeError(404, "Product not found");
    }

    // Restore the reserved quantity.
    await orderRepository.changeStock(client, order.productId, order.quantity);

    await orderRepository.remove(client, id);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
