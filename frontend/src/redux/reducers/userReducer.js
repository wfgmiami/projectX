import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  switch(action.type) {
    case types.AUTH_USER_SUCCESS:
      return {...state, signinStatus: true, access_token: action.user, authStatus: "Success" };
    case types.AUTH_USER_FAILURE:
      return {...state, signinStatus: false, access_token: null, authStatus: "Fail" };
    case types.USER_SIGN_OUT:
        return {...state, signinStatus: false, access_token: null, authStatus: null };
    default:
      return state;
  }
}


