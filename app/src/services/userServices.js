const API_URL = "http://localhost:3000/api/users";

const handleResponse = async (response) => {
  if (!response.ok) {
    try {
      errorData = await response.json();
    } catch (error) {
      errorData = { errorData: "Request Failed" };
    }
  }
  throw new Error(errorData.message || "Request Failed");
  return errorData;
};
