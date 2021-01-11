import {
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_FAILURE,
  UPDATE_TRANSACTION_SUCCESS,
} from "./actionTypes";
import {
  getTransaction as loadTransactionsApi,
  updateTransaction as updateTransactionApi,
} from "../../api/transactionApi";
import { beginApiCall } from "./apiStatusActions";

export function loadTransactions(symbol) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return loadTransactionsApi(symbol)
      .then((data) => dispatch(loadTransactionsSuccess(data)))
      .catch((error) => dispatch(loadTransactionsFailure(error)));
  };
}

export function updateTransaction(updatedTransaction) {
  console.log("updatedTransaction: ", updatedTransaction);
  return function (dispatch) {
    return updateTransactionApi(updatedTransaction)
      .then((data) => dispatch(updateTransactionSucess(data)))
      .catch((error) => console.log(error));
  };
}

function updateTransactionSucess(data) {
  console.log("updatedTransaction: data: ", data);
  return {
    type: UPDATE_TRANSACTION_SUCCESS,
  };
}

function loadTransactionsSuccess(data) {
  const transactions = data.transactions;

  return {
    type: LOAD_TRANSACTIONS_SUCCESS,
    transactions,
  };
}

function loadTransactionsFailure(error) {
  return {
    type: LOAD_TRANSACTIONS_FAILURE,
    error,
  };
}
