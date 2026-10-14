import { Form } from "react-bootstrap";

const DynamicSelect = ({
  name,
  label,
  value,
  options = [],
  valueKey = "id",
  labelKey = "name",
  onChange,
  placeholder = "Select an option",
  required = false,
  disabled = false,
}) => {
  return (
    <Form.Group controlId={name}>
      {label && <Form.Label>{label}</Form.Label>}

      <Form.Select
        name={name}
        value={value ?? ""}
        onChange={onChange}
        required={required}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option[valueKey]} value={option[valueKey]}>
            {option[labelKey]}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default DynamicSelect;
