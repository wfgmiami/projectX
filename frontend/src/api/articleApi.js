import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/api/articles/";

export function getArticles() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveArticle(article) {
  return fetch(baseUrl + (article.id || ""), {
    method: article.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(article)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteArticle(articleId) {
  return fetch(baseUrl + articleId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
