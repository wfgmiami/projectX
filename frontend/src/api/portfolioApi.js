import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/api/portfolios/";

export function loadPortfolios() {
  // console.log("frontend/src/api/portfoliApi: loadPortfolios");
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function loadPortfolio(portfolio_id) {
  // console.log(
  //   "frontend/src/api/portfoliApi: loadPortfolio: portfolio_id",
  //   portfolio_id
  // );
  return fetch(`${baseUrl}/${portfolio_id}`)
    .then(handleResponse)
    .catch(handleError);
}

export function createPortfolio(portfolio) {
  // console.log("portfolio: ", portfolio);
  return fetch(baseUrl + (portfolio.port_id || ""), {
    method: portfolio.port_id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(portfolio),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deletePortfolio(portfolio_id) {
  // console.log(
  //   "frontend/src/api/portfoliApi: deletePortfolio: portfolio_id",
  //   portfolio_id
  // );
  return fetch(baseUrl + portfolio_id, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}

export function deletePortfolioOptimistic(portfolio_id) {
  return fetch(baseUrl + portfolio_id, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
