const validatorUsers = (user) => {
  if (!user.first_name || user.first_name.trim() === "") {
    errors.push("First name is required.");
  }

  if (!user.last_name || user.last_name.trim() === "") {
    errors.push("Last name is required.");
  }

  if (user.email && !user.email.includes("@")) {
    errors.push("Invalid Email.");
  }

  module.exports = {
    validatorUsers,
  };
};
