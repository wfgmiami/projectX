import * as types from './actionTypes';
import * as userApi from '../../api/userApi';


export function authUserSuccess(user) {
  return { type: types.AUTH_USER_SUCCESS, user }
}

export function authUserFailure(error) {
  return { type: types.AUTH_USER_FAILURE, error }
}

export function authUser(email, password) {
  const authObj = {email, password};

  return function (dispatch) {
    return userApi
    .authUser(authObj)
    .then(user => {
      // user = {access_token:""}
      dispatch(authUserSuccess(user))
    })
    .catch(error => {
      dispatch(authUserFailure(error))
    })
  }
}

export function register(newUser) {
  return function (dispatch) {
    return userApi
    .registerUser(newUser)
    .then(user => {
      // user = {access_token:""}
      dispatch(authUserSuccess(user))
    })
    .catch(error => {
      dispatch(authUserFailure(error))
    })
  }
}

export function signoutUser() {
  return { type: types.USER_SIGN_OUT }
}


