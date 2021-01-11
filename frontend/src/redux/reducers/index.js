// import { combineReducers } from 'redux';
// import articles from './articleReducer';
// import authors from './authorReducer';
// import user from './userReducer';
// import apiCallsInProgress from "./apiStatusReducer";
// import contactForm from './contactReducer';
// import registerUser from './registrationReducer';

// const rootReducer = combineReducers({
//   articles,
//   authors,
//   user,
//   apiCallsInProgress,
//   contactForm,
//   registerUser
// })

// export default rootReducer;

import { combineReducers } from "redux";
import portfolios from "./portfolioReducer";
import holdings from "./holdingReducer";
import transactions from "./transactionReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  portfolios,
  holdings,
  transactions,
  apiCallsInProgress,
});

export default rootReducer;
