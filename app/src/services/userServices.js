const API_URL = `${import.meta.env.VITE_API_URL}/users`; //base url for user api endpoints

import handleResponse from "./handleResponse";

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
