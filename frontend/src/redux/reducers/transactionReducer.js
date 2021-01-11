import * as types from "../actions/actionTypes";

const initialState = {
  transactionsList: [],
  transactionsLoadedStatus: "",
  error: "",
};

export default function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_TRANSACTIONS_SUCCESS:
      return { ...state, transactionsList: [...action.transactions] };
    case types.LOAD_TRANSACTIONS_FAILURE:
      return {
        ...state,
        error: action.error,
        transactionsLoadedStatus: "failure",
      };
    default:
      return state;
  }
}
