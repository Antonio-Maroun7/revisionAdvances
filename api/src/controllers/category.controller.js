const categoryService = require("../services/categoryService");
const categoryValidator = require("../validators/category.validator");

const sendError = (res, error) => {
  const status = error.status || 500;
  res.status(status).json({
    message: error.message || "Internal server error",
  });
};

const toCategory = (body) => ({
  name: body.name.trim(),
  description: body.description?.trim() || null,
  isActive: body.isActive ?? true,
});

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    sendError(res, error);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    sendError(res, error);
  }
};

const createCategory = async (req, res) => {
  try {
    const category = toCategory(req.body);
    const errors = categoryValidator(category);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    const createdCategory = await categoryService.createCategory(category);
    res.status(201).json(createdCategory);
  } catch (error) {
    sendError(res, error);
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = toCategory(req.body);
    const errors = categoryValidator(category);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    const updatedCategory = await categoryService.updateCategory(
      req.params.id,
      category,
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    sendError(res, error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await categoryService.deleteCategory(req.params.id);
    res.status(200).json(deletedCategory);
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
