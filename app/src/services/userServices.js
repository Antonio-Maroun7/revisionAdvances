const API_URL = "http://localhost:3000/api/users"; //base url for user api endpoints

const handleResponse = async (response) => {
  //function to handle API responses
  if (!response.ok) {
    //if there is anything wrong with the response ,handle it
    let errorData; //variable to store error information
    try {
      errorData = await response.json(); //try to parse the error response as json
    } catch {
      errorData = { error: "Request Failed" }; //if parsing fails, set a generic error message
    }
    throw new Error(errorData.error || "Request Failed"); //throw an error with the parsed or generic message
  }
  if (response.status === 204) {
    //if the response has no content, return null
    return null;
  }
  return await response.json(); //return the parsed json response
};

export const getUsers = async () => {
  //function to get the list of users from the API
  const response = await fetch(API_URL); //fetch the list of users from the API
  return await handleResponse(response); //handle the API response using the handleResponse function
};

export const getUserById = async (id) => {
  //function to get a user by their ID from the API
  const response = await fetch(`${API_URL}/${id}`); //fetch the user by id from the API

  return await handleResponse(response); //handle the API response using the handleResponse function
};

export const createUser = async (userData) => {
  //function to create a new user in the API

  const response = await fetch(API_URL, {
    //send a POST request to create a new user
    method: "POST", //specify the HTTP method as POST for creating a new user
    headers: {
      //specify the headers for the request
      "Content-Type": "application/json", //specify that the request body is in JSON format
    },
    body: JSON.stringify(userData), //convert the user data to a JSON string for the request body
  });
  return await handleResponse(response); //handle the API response using the handleResponse function
};

export const updateUser = async (id, userData) => {
  //function to update a user by their ID in the API
  const response = await fetch(`${API_URL}/${id}`, {
    //send a PUT request to update a user by their ID
    method: "PUT", //specify the HTTP method as PUT for updating a user
    headers: {
      "Content-Type": "application/json", //specify that the request body is in JSON format
    },
    body: JSON.stringify(userData), //convert the user data to a JSON string for the request body
  });
  return await handleResponse(response); //handle the API response using the handleResponse function
};

export const deleteUser = async (id) => {
  //function to delete a user by their ID in the API
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE", //specify the HTTP method as DELETE for deleting a user
  });
  return await handleResponse(response); //handle the API response using the handleResponse function
};
