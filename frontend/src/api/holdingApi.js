import { handleResponse, handleError } from "./apiUtils";

export function getPortfolioHolding(portfolio_id) {
  const baseUrl =
    process.env.API_URL + `/api/portfolios/${portfolio_id}/holdings`;

  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
