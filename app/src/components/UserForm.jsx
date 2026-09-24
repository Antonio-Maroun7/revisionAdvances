import { useEffect, useState } from "react";

const UserForm = (selectedUser, onSave, onCancel) => {
  // User form component
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    if (selectedUser) {
      setForm({
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        email: selectedUser.email,
        age: selectedUser.age,
      });
    } else {
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
      });
    }
  }, [selectedUser]); // Update form when selectedUser changes

  const handleChange = (event) => {
    // Handle form input changes
    event.preventDefault();
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      ...form,
      age: form.age === "" ? null : Number(form.age),
    };
    onSave(user);
  };
  return (
    <>
      <h2>{selectedUser ? "Edit User" : "Create User"}</h2>
      <div>
        <label>First Name:</label>
        <br />
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <br />
      <div>
        <label>Last Name:</label>
        <br />
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <br />
      <div>
        <label>Email :</label>
        <br />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <br />
      <div>
        <label>Age:</label>
        <br />
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
        />
      </div>
      <br />
      <button type="submit">
        {selectedUser ? "Update User" : "Create User"}
      </button>
      {selectedUser && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </>
  );
};

export default UserForm;
