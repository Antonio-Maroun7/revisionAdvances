const Student = ({ firstName, age, major }) => {
  return (
    <>
      <ul>
        <li>First Name: {firstName}</li>
        <li>Age: {age}</li>
        <li>Major: {major}</li>
      </ul>
    </>
  );
};

export default Student;
