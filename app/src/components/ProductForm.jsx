import { useState, useEffect } from "react";

const ProductForm = ({ selectedProduct, onSave, onCancel }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      setForm({
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
        quantity: selectedProduct.quantity,
      });
    } else {
      setForm({
        name: "",
        description: "",
        price: "",
        quantity: "",
      });
    }
  }, [selectedProduct]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const product = {
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
    };

    onSave(product);

    setForm({
      name: "",
      description: "",
      price: "",
      quantity: "",
    });
  };

  return (
    <>
      <h2>{selectedProduct ? "Edit Product" : "Create Product"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <br />

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Product Description:</label>
          <br />

          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Product Price:</label>
          <br />

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Product Quantity:</label>
          <br />

          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
          />
        </div>

        <br />

        <button type="submit">
          {selectedProduct ? "Update Product" : "Create Product"}
        </button>

        {selectedProduct && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </form>
    </>
  );
};

export default ProductForm;
