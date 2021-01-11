import {
  LOAD_PORTFOLIO_HOLDING_SUCCESS,
  LOAD_PORTFOLIO_HOLDING_FAILURE,
} from "./actionTypes";
import { getPortfolioHolding } from "../../api/holdingApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

function loadPortfolioHoldingsSuccess(data) {
  const holdings = data.holdings;
  return {
    type: LOAD_PORTFOLIO_HOLDING_SUCCESS,
    holdings,
  };
}

function loadPortfolioHoldingsFailure(error) {
  return {
    type: LOAD_PORTFOLIO_HOLDING_FAILURE,
    error,
  };
}

export function loadPortfolioHoldings(portfolio_id) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return getPortfolioHolding(portfolio_id)
      .then((data) => {
        // console.log("loadPortfolioHolding: data: ", data);
        dispatch(loadPortfolioHoldingsSuccess(data));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        dispatch(loadPortfolioHoldingsFailure(error));
      });
  };
}
