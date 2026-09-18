import { useState, useEffect } from "react";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    fillDummyUsers();
  }, []);

  const fillDummyUsers = () => {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({
        id: i,
        firstName: `FN ${i}`,
        lastName: `LN ${i}`,
        age: 20 + i,
      });
    }
    setUsers(arr);
  };

  const addUser = () => {
    if (firstName === "" || lastName === "" || age === "") {
      alert("All fields are required");
      return;
    }
    const newUser = {
      id: Date.now(),
      firstName: firstName,
      lastName: lastName,
      age: age,
    };
    setUsers([...users, newUser]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const updateUser = (id) => {
    if (firstName === "" || lastName === "" || age === "") {
      alert("All fields are required");
      return;
    }

    const updatedUser = users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          firstName: firstName,
          lastName: lastName,
          age: age,
        };
      }
      return user;
    });
    setUsers(updatedUser);
  };

  return (
    <>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button className="btn btn-primary" onClick={addUser}>
        Add User
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.age}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => updateUser(user.id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
