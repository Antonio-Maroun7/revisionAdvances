const API_URL = `${import.meta.env.VITE_API_URL}/products`;
import handleResponse from "./handleResponse";

export const getProducts = async () => {
  const response = await fetch(API_URL);
  return handleResponse(response);
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return handleResponse(response);
};

export const createProduct = async (productData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  return handleResponse(response);
};

export const updateProduct = async (id, productData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  return handleResponse(response);
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};
