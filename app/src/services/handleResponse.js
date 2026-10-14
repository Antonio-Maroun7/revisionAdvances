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
export default handleResponse;
