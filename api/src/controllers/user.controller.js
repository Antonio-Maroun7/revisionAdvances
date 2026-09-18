const UserService = require("../services/user.service");
const UserValidators = require("../validators/user.validator");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await UserService.updateUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await UserService.deleteUser(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const handleResponse = async (response) => {
  return await response.json();
};

module.exports = {
  getAllUsers,
  getUserById,
  handleResponse,
  deleteUser,
  createUser,
  updateUser,
};
