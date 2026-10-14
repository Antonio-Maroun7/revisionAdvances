import { useState, useEffect } from "react";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import Dropdown from "../components/Dropdown";

const getFormFromProduct = (product) => ({
  name: product?.name ?? "",
  description: product?.description ?? "",
  price: product?.price ?? "",
  quantity: product?.quantity ?? "",
  categoryId: product?.categoryId ?? "",
});

const ProductForm = ({ selectedProduct, categories, onSave, onCancel }) => {
  const [form, setForm] = useState(() => getFormFromProduct(selectedProduct));

  useEffect(() => {
    if (selectedProduct) {
      setForm(getFormFromProduct(selectedProduct));
    } else {
      setForm(getFormFromProduct(null));
    }
  }, [selectedProduct]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const product = {
      ...form,
      price: Number(form.price),
      quantity: form.quantity === "" ? 0 : Number(form.quantity),
      categoryId: form.categoryId === "" ? null : Number(form.categoryId),
    };

    await onSave(product);
  };

  return (
    <>
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
          <Button variant="Outline-secondary" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {selectedProduct ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </Form>
    </>
  );
};
export default ProductForm;
