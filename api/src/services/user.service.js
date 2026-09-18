const UserRepository = require("../repositories/user.repository");

const getAllUsers = async () => {
  return await UserRepository.findAllUsers();
};

const getUserById = async (id) => {
  const user = await UserRepository.findUserById(id);
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
  return user;
};

const createUser = async (user) => {
  return await UserRepository.create(user);
};

const updateUser = async (id, user) => {
  const existingUser = await UserRepository.findUserById(id);
  if (!existingUser) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
  return await UserRepository.updateUser(id, user);
};

const deleteUser = async (id) => {
  const existingUser = await UserRepository.findUserById(id);
  if (!existingUser) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
  return await UserRepository.deleteUser(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
