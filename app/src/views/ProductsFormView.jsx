import { useEffect, useState } from "react";
import { Alert, Card, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import {
  getProductById,
  createProduct,
  updateProduct,
} from "../services/productService";
import { getCategories } from "../services/categoryService";

const ProductFormView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        const [categoriesData, productData] = await Promise.all([
          getCategories(),
          isEdit ? getProductById(id) : null,
        ]);

        if (!cancelled) {
          setCategories(categoriesData);
          setProduct(productData);
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

    loadData();

    return () => {
      cancelled = true;
    };
  }, [id, isEdit]);

  const handleSave = async (data) => {
    try {
      setError("");
      if (isEdit) {
        await updateProduct(id, data);
      } else {
        await createProduct(data);
      }

      navigate("/products");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    navigate("/products");
  };

  return (
    <div className="mx-auto" style={{ maxWidth: "640px" }}>
      <h1 className="h3 mb-4">{isEdit ? "Edit Product" : "Create Product"}</h1>
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <Card className="shadow-sm">
        <Card.Body className="p-4">
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" size="sm" className="me-2" />
              Loading product...
            </div>
          ) : (
            (!isEdit || product) && (
              <ProductForm
                key={product?.id ?? "new"}
                selectedProduct={product}
                categories={categories}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductFormView;
