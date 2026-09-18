import { Button } from "react-bootstrap";
import { useState } from "react";

const UserForm = () => {
  const [person, setPerson] = useState({
    firstName: "Jhon",
    LastName: "Doe",
    age: 39,
  });

  const persons = [
    {
      firstName: "Jhon",
      LastName: "Doe",
      age: 39,
    },
  ];

  const updateFirstName = (fn) => {
    setPerson({
      ...person,
      firstName: fn,
    });
  };

  const updateLastName = (ln) => {
    setPerson({
      ...person,
      LastName: ln,
    });
  };

  const updateAge = (age) => {
    setPerson({
      ...person,
      age: age,
    });
  };
  return (
    <>
      <h2>UserForm </h2>
      <p>
        {" "}
        Welcome {person.firstName} {person.LastName}, {person.age}
      </p>
      <Button
        className="btn btn-success"
        onClick={() => updateFirstName("test")}
      >
        Update FirstName
      </Button>
      <Button
        className="btn btn-danger"
        onClick={() => updateLastName("ln test")}
      >
        Update LastName
      </Button>
      <Button
        className="btn btn-sm btn-secondary"
        onClick={() => updateAge(144)}
      >
        Update Age
      </Button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.firstName}</td>
                <td>{item.LastName}</td>
                <td>{item.age}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default UserForm;
