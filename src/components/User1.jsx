import { useState } from "react";

const User1 = () => {
  const [person, setPerson] = useState({
    firstName: "Jhon",
    lastName: "Doe",
    age: 39,
  });

  const updateFirstName = (event) => {
    setPerson({
      ...person,
      firstName: event.target.value,
    });
  };

  const updateLastName = (event) => {
    setPerson({
      ...person,
      lastName: event.target.value,
    });
  };

  const updateAge = (event) => {
    setPerson({
      ...person,
      age: event.target.value,
    });
  };

  return (
    <>
      <h2>User Form</h2>
      <p>
        Welcome {person.firstName}, {person.lastName}, {person.age}
      </p>
      <input
        type="text"
        placeholder="First Name"
        value={person.firstName}
        onChange={updateFirstName}
      ></input>
      <input
        type="text"
        placeholder="Last Name"
        value={person.lastName}
        onChange={updateLastName}
      ></input>
      <input
        type="number"
        placeholder="Age"
        value={person.age}
        onChange={updateAge}
      ></input>
    </>
  );
};

export default User1;
