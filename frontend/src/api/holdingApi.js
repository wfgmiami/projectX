import { handleResponse, handleError } from "./apiUtils";

export function getPortfolioHolding(portfolio_id) {
  const baseUrl = process.env.API_URL + `/api/holdings/${portfolio_id}`;

  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function deletePortfolioHolding({
  deletedTransSymbol,
  deletedTransPortId,
}) {
  console.log(
    "deleteHolding: deleteHolding: ",
    deletedTransSymbol,
    "deletedTransPortId",
    deletedTransPortId
  );

  const symbol = deletedTransSymbol;
  const portId = deletedTransPortId;
  return fetch(process.env.API_URL + `/api/holdings/${portId}/${symbol}`, {
    method: "DELETE",
  })
    .then(handleResponse)
    .catch(handleError);
}
