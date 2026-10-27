import { useEffect } from "react";
import { Form, Row, Col, InputGroup, Button, Alert } from "react-bootstrap";
import Dropdown from "../components/Dropdown";
import useForm from "../hooks/useForm";

const getFormFromProduct = (product) => ({
  name: product?.name ?? "",
  description: product?.description ?? "",
  price: product?.price ?? "",
  quantity: product?.quantity ?? "",
  categoryId: product?.categoryId ?? "",
});

const ProductForm = ({ selectedProduct, categories, onSave, onCancel }) => {
  // Convert the text inputs to the types expected by the API before saving.
  const saveProduct = (formValues) =>
    onSave({
      ...formValues,
      price: Number(formValues.price),
      quantity: formValues.quantity === "" ? 0 : Number(formValues.quantity),
      categoryId:
        formValues.categoryId === "" ? null : Number(formValues.categoryId),
    });

  const { values: form, handleChange, handleSubmit, resetForm, loading, error, setError } =
    useForm(getFormFromProduct(selectedProduct), saveProduct);

  // Refill the form when switching between Create and Edit (or between records).
  useEffect(() => {
    resetForm(getFormFromProduct(selectedProduct));
  }, [selectedProduct, resetForm]);
  return (
    <>
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError("")}>
          {error}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Product Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            rows={3}
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Row className="g-3 mb-3">
          <Form.Group as={Col} sm={6} controlId="price">
            <Form.Label>Price:</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="Number"
                name="price"
                min="0"
                max="9999999.9"
                step="0.1"
                value={form.price}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} sm={6} controlId="quantity">
            <Form.Label>Quantity:</Form.Label>
            <Form.Control
              type="Number"
              name="quantity"
              min="0"
              max="9999999"
              step="1"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="categoryId">
          <Form.Label>Category:</Form.Label>
          <Dropdown
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            options={categories}
            placeholder="-- No category --"
          />
        </Form.Group>
        <div className="d-flex justify-content-end gap-2 mt-4">
          <Button variant="Outline-secondary" onClick={onCancel} type="button" disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {selectedProduct ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </Form>
    </>
  );
};
export default ProductForm;
