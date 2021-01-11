import { handleResponse, handleError } from "./apiUtils";

// load all transactions for a given holding (TransactionTable)
export function loadTransactions(trans) {
  console.log("loadTransactions: trans: ", trans);
  const portId = trans.portfolioId;
  const symbol = trans.symbol;
  const baseUrl = process.env.API_URL + `/api/transactions/${portId}/${symbol}`;
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function loadTransaction(transId) {
  const baseUrl = process.env.API_URL + `/api/transactions/id/${transId}`;
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function updateTransaction(updatedTransaction) {
  console.log("API: updatedTransaction", updatedTransaction);
  const transId = updatedTransaction.trans_buy_id;
  let baseUrl = process.env.API_URL + `/api/transactions/`;
  if (transId) {
    baseUrl += `${transId}`;
  }
  return fetch(baseUrl, {
    method: transId ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(updatedTransaction),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteTransaction({
  deletedTransId,
  deletedTransSymbol,
  deletedTransPortId,
}) {
  console.log(
    "deleteTransaction: deletedTransSymbol: ",
    deletedTransSymbol,
    "deletedTransPortId",
    deletedTransPortId
  );

  const transId = deletedTransId;
  const symbol = deletedTransSymbol;
  const portId = deletedTransPortId;
  return fetch(
    process.env.API_URL + `/api/transactions/${portId}/${symbol}/${transId}`,
    { method: "DELETE" }
  )
    .then(handleResponse)
    .catch(handleError);
}
