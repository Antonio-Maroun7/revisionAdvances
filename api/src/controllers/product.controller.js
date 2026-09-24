const ProductService = require("../services/product.service");

const getAllProducts = async (req, res) => {
  try {
    const product = await ProductService.findAllProducts();
    res.status(200).json(product);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await ProductService.findProductById(id);
    res.status(200).json(products);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await ProductService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await ProductService.updateProduct(req.params.id, req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await ProductService.deleteProduct(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
