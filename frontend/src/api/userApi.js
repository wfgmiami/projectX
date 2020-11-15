import { handleResponse, handleError } from "./apiUtils";

const signinUrl = process.env.API_URL + "/api/signin/";
const signupUrl = process.env.API_URL + "/api/signup/";

export function authUser(authObj) {

  return fetch(signinUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(authObj)
  })
    .then(handleResponse)
    .catch(handleError);
}


export function registerUser(newUser) {
  console.log('newUser', newUser)
  return fetch(signupUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newUser)
  })
    .then(handleResponse)
    .catch(handleError);
}
