import { combineReducers } from 'redux';
import articles from './articleReducer';
import authors from './authorReducer';
import user from './userReducer';
import apiCallsInProgress from "./apiStatusReducer";
import contactForm from './contactReducer';
import registerUser from './registrationReducer';

const rootReducer = combineReducers({
  articles,
  authors,
  user,
  apiCallsInProgress,
  contactForm,
  registerUser
})

export default rootReducer;
