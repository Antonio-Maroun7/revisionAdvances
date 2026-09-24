const API_URL = "http://localhost:3000/api/products";

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorData;

    try {
      errorData = await response.json();
    } catch {
      errorData = {
        message: "Request failed",
      };
    }

    if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
      throw new Error(errorData.errors.join(", "));
    }

    throw new Error(errorData.message || "Request failed");
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
};

export const getProducts = async () => {
  const response = await fetch(API_URL);

  return handleResponse(response);
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  return handleResponse(response);
};

export const createProduct = async (product) => {
  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(product),
  });

  return handleResponse(response);
};

export const updateProduct = async (id, product) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(product),
  });

  return handleResponse(response);
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
};
