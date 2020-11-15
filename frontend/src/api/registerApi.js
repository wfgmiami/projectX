import { handleResponse, handleError } from "./apiUtils";
const registerUrl = process.env.API_URL + "/api/signup/";


export function registerUser(newUser) {
  console.log('registerUser: newUser:', newUser)
  return fetch(registerUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newUser)
  })
    .then(handleResponse)
    .catch(handleError);
}
