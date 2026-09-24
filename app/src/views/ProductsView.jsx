import { useCallback, useEffect, useState } from "react";

import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productServices";

const ProductsView = () => {
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadInitialProducts = async () => {
      try {
        const data = await getProducts();

        if (!cancelled) {
          setProducts(data);
          setError("");
        }
      } catch (error) {
        if (!cancelled) {
          setError(error.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadInitialProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSave = async (product) => {
    try {
      setError("");

      if (selectedProduct) {
        await updateProduct(selectedProduct.id, product);
      } else {
        await createProduct(product);
      }

      setSelectedProduct(null);

      await loadProducts();
    } catch (error) {
      setError(error.message);

      throw error;
    }
  };

  const handleEdit = (product) => {
    if (product) {
      setSelectedProduct(product);
    }
  };

  const handleCancel = () => {
    setSelectedProduct(null);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteProduct(id);

      setSelectedProduct(null);

      await loadProducts();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h1>Product Management</h1>

      {error && <p>Error: {error}</p>}

      <ProductForm
        key={selectedProduct?.id ?? "new"}
        selectedProduct={selectedProduct}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <h2>Products</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default ProductsView;
