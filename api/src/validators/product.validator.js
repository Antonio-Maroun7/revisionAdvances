const MAX_PRICE = 99999999.99;
const MAX_QUANTITY = 2147483647;
const validateProduct = (product = {}) => {
  const errors = [];
  const name = typeof product.name === "string" ? product.name.trim() : "";
  const price = Number(product.price);
  const quantity = Number(product.quantity);

  if (!name) {
    errors.push("Name is required");
  }

  if (
    product.description !== null &&
    product.description !== undefined &&
    typeof product.description !== "string"
  ) {
    errors.push("Description must be text");
  }

  if (
    product.price === null ||
    product.price === undefined ||
    product.price === "" ||
    price < 0 ||
    price > MAX_PRICE
  ) {
    errors.push("Price must be a valid number between 0 and " + MAX_PRICE);
  }
  if (
    product.quantity === null ||
    product.quantity === undefined ||
    product.quantity === "" ||
    quantity < 0 ||
    quantity > MAX_QUANTITY
  ) {
    errors.push(
      "Quantity must be a valid number between 0 and " + MAX_QUANTITY,
    );
  }

  if (
    product.category_id === null ||
    product.category_id === undefined ||
    product.category_id === "" ||
    !Number.isInteger(Number(product.category_id)) ||
    Number(product.category_id) <= 0
  ) {
    errors.push("Category ID must be provided");
  }
  return errors;
};
