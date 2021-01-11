import * as types from "../actions/actionTypes";

const initialState = {
  holdingsList: [],
  holdingsLoadedStatus: "",
  error: "",
};

export default function holdingReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_PORTFOLIO_HOLDING_SUCCESS:
      return {
        ...state,
        holdingsList: action.holdings,
      };
    default:
      return state;
  }
}
