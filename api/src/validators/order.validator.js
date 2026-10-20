const isValidId = (value) => {
  if (value === null || value === undefined || value === "") {
    return false;
  }

  const number = Number(value);

  return Number.isInteger(number) && number > 0 && number <= 2147483647;
};

const validateOrder = (order = {}) => {
  const errors = [];

  if (!isValidId(order.productId)) {
    errors.push("Product ID must be a positive integer");
  }

  const quantity = Number(order.quantity);

  if (
    order.quantity === null ||
    order.quantity === undefined ||
    order.quantity === "" ||
    !Number.isInteger(quantity) ||
    quantity <= 0 ||
    quantity > 2147483647
  ) {
    errors.push("Quantity must be a positive integer");
  }

  return errors;
};

module.exports = {
  isValidId,
  validateOrder,
};
