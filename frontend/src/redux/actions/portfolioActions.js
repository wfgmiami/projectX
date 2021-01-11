import {
  LOAD_PORTFOLIOS_SUCCESS,
  LOAD_PORTFOLIOS_FAILURE,
  LOAD_PORTFOLIO_SUCCESS,
  LOAD_PORTFOLIO_FAILURE,
  CREATE_PORTFOLIO_SUCCESS,
  UPDATE_PORTFOLIO_SUCCESS,
  DELETE_PORTFOLIO_SUCCESS,
  DELETE_PORTFOLIO_OPTIMISTIC,
} from "./actionTypes";
import {
  loadPortfolios as loadPortfoliosApi,
  createPortfolio as createPortfolioApi,
  deletePortfolio as deletePortfolioApi,
  deletePortfolioOptimistic as deletePortfolioOptimisticApi,
  loadPortfolio as loadPortfolioApi,
} from "../../api/portfolioApi";

export function loadPortfolios() {
  return function (dispatch) {
    return loadPortfoliosApi()
      .then((portfoliosData) => {
        dispatch(loadPortfoliosSuccess(portfoliosData));
      })
      .catch((error) => {
        dispatch(loadPortfoliosFailure(error));
      });
  };
}

export function loadPortfolio(portfolioId) {
  return function (dispatch) {
    return loadPortfolioApi(portfolioId)
      .then((portfolioData) => {
        dispatch(loadPortfolioSuccess(portfolioData));
      })
      .catch((error) => {
        dispatch(loadPortfolioFailure(error));
      });
  };
}

export function createPortfolio(portfolio) {
  const port_id = portfolio.port_id;

  return function (dispatch) {
    return createPortfolioApi(portfolio)
      .then((createdPortfolio) => {
        port_id
          ? dispatch(updatePortfolioSuccess(createdPortfolio))
          : dispatch(createPortfolioSuccess(createdPortfolio));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deletePortfolio(portfolio_id) {
  // console.log(
  //   "frontend/src/redux/actions/portfolioActions: deletePortfolio: portfolio_id",
  //   portfolio_id
  // );
  return function (dispatch) {
    return deletePortfolioApi(portfolio_id)
      .then(() => {
        dispatch(deletePortfolioSuccess(portfolio_id));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deletePortfolioOptimistically(portfolio_id) {
  return function (dispatch) {
    dispatch(deletePortfolioOptimistic(portfolio_id));
    return deletePortfolioOptimisticApi(portfolio_id);
  };
}

function loadPortfoliosSuccess(portfoliosData) {
  const portfolios = portfoliosData.data.portfolios;
  // console.log(
  //   "loadPortfolioSuccess: portfoliosData: ",
  //   portfoliosData
  // );
  return {
    type: LOAD_PORTFOLIOS_SUCCESS,
    payload: { portfolios, porfoliosLoadedStatus: "success" },
  };
}

function loadPortfoliosFailure(error) {
  return {
    type: LOAD_PORTFOLIOS_FAILURE,
    payload: { porfoliosLoadedStatus: "failure", error },
  };
}

function loadPortfolioSuccess(portfolioData) {
  const portfolio = portfolioData.data.portfolio[0];
  console.log(
    "loadPortfolioSuccess: portfolioData: ",
    portfolioData,
    " portfolio: ",
    portfolio
  );
  return {
    type: LOAD_PORTFOLIO_SUCCESS,
    payload: { portfolio, porfolioLoadedStatus: "success" },
  };
}

function loadPortfolioFailure(error) {
  return {
    type: LOAD_PORTFOLIO_FAILURE,
    payload: { porfolioLoadedStatus: "failure", error },
  };
}

function createPortfolioSuccess(createdPortfolio) {
  // console.log("createPortfolioSuccess: createdPortfolio:", createdPortfolio);
  const portfolio = createdPortfolio.portfolio;

  return {
    type: CREATE_PORTFOLIO_SUCCESS,
    portfolio,
  };
}

function updatePortfolioSuccess(updatedPortfolio) {
  const portfolio = updatedPortfolio.portfolio;
  return {
    type: UPDATE_PORTFOLIO_SUCCESS,
    portfolio,
  };
}

function deletePortfolioSuccess(portfolio_id) {
  return {
    type: DELETE_PORTFOLIO_SUCCESS,
    portfolio_id: parseInt(portfolio_id),
  };
}

function deletePortfolioOptimistic(portfolio_id) {
  return {
    type: DELETE_PORTFOLIO_OPTIMISTIC,
    portfolio_id: parseInt(portfolio_id),
  };
}
