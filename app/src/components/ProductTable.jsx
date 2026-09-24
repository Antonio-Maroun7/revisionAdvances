const ProductTable = ({ products, onEdit, onDelete }) => {
  if (products.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <>
      <h2>Products</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Product Price</th>
            <th>Product Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>

              <td>
                <button onClick={() => onEdit(product)}>Edit</button>

                <button onClick={() => onDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductTable;
