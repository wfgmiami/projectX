import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function portfolioReducer(
  state = initialState.portfolios,
  action
) {
  // console.log("frontend/src/redux/reducers/portfolioReducer: action: ", action);
  // const test = {
  //   ...state,
  //   portfolioList: [
  //     ...state.portfoliosList.filter(
  //       (port) => port.port_id !== action.portfolio_id
  //     ),
  //   ],
  // };

  // console.log("test", test);

  switch (action.type) {
    case types.LOAD_PORTFOLIOS_SUCCESS:
      return {
        ...state,
        portfoliosList: [...action.payload.portfolios],
        porfoliosLoadedStatus: action.payload.porfoliosLoadedStatus,
      };

    case types.LOAD_PORTFOLIOS_FAILURE:
      return {
        ...state,
        porfoliosLoadedStatus: action.payload.porfoliosLoadedStatus,
        error: action.payload.error,
      };

    case types.LOAD_PORTFOLIO_SUCCESS:
      return {
        ...state,
        portfolio: { ...action.payload.portfolio },
      };

    case types.LOAD_PORTFOLIO_FAILURE:
      return {
        ...state,
        porfolioLoadedStatus: action.payload.porfolioLoadedStatus,
        error: action.payload.error,
      };

    case types.CREATE_PORTFOLIO_SUCCESS:
      return {
        ...state,
        portfoliosList: [...state.portfoliosList, { ...action.portfolio }],
        // only action.portfolio object is in the state after the update
        // portfoliosList: [...state.portfoliosList, action.portfolio],
        // Invalid attempt to spread non-iterable instance
        // portfoliosList: [...state.portfoliosList, ...action.portfolio],
      };

    case types.UPDATE_PORTFOLIO_SUCCESS:
      return {
        ...state,
        portfoliosList: [
          ...state.portfoliosList.map((port) =>
            port.port_id === action.portfolio.port_id ? action.portfolio : port
          ),
        ],
      };

    case types.DELETE_PORTFOLIO_SUCCESS:
      return {
        ...state,
        portfoliosList: [
          ...state.portfoliosList.filter(
            (port) => port.port_id !== action.portfolio_id
          ),
        ],
      };

    default:
      return state;
  }
}

// state: { portfoliosList: [
//           {port_id: 1, port_name: 'main', createdAt:'' },
//           {port_id: 2, port_name: 'all', createdAt:'' },...],
//          porfoliosLoadedStatus: "success",
//          error: {}
//        }
