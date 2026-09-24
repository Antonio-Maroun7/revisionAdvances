const ProductRepository = require("../repositories/product.repository");

const findAllProducts = async () => {
  return await ProductRepository.findAllProducts();
};

const findProductById = async (id) => {
  const product = await ProductRepository.findProductById(id);
  if (!product) {
    const error = new Error(`Product with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return product;
};

const createProduct = async (product) => {
  return await ProductRepository.createProduct(product);
};

const updateProduct = async (id, product) => {
  const existingProduct = await ProductRepository.findProductById(id);
  if (!existingProduct) {
    const error = new Error(`Product with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return await ProductRepository.updateProduct(id, product);
};

const deleteProduct = async (id) => {
  const existingProduct = await ProductRepository.findProductById(id);
  if (!existingProduct) {
    const error = new Error(`Product with id ${id} not found`);
    error.status = 404;
    throw error;
  }
  return await ProductRepository.deleteProduct(id);
};

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
