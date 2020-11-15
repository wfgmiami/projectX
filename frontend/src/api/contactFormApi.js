import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/contactform/";



export function saveContactFormData(contactForm) {

  return fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(contactForm)
  })
    .then(handleResponse)
    .catch(handleError);
}
