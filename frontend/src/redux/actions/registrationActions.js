import axios from 'axios';
import * as types from './actionTypes';
import * as registerApi from '../../api/registerApi';

// export function setRegisterUser(registerUser){

//     const postRegisterUser = axios.post('/api/register',{ ...registerUser });
//     return (dispatch) =>
//         postRegisterUser.then((response) =>
//             dispatch({
//                 type: types.SUCCESS_CANDIDATE_REGISTRATION,
//                 payload: response.data
//             })
//         )
//         .catch( (err) => {
//             alert("An error occurred submitting the registration. Please try again")
//             window.location.reload();
//         })
// }

export function registerUserSuccess(user) {
    return { type: types.REGISTER_USER_SUCCESS, user }
  }

  export function registerUserFailure(error) {
    return { type: types.REGISTER_USER_FAILURE, error }
  }

export function setRegisterUser(registerUser) {
    return function (dispatch) {
      return registerApi
      .registerUser(registerUser)
      .then(user => {
        // user = {access_token:""}
        dispatch(registerUserSuccess(user))
      })
      .catch(error => {
        dispatch(registerUserFailure(error))
      })
    }
  }



export function setRegisterUserAttributes(attribute){
    console.log('registrationActions: attribute:', attribute)
    return {
        type: types.SET_CANDIDATE_ATTRIBUTES,
        attribute
    }
}
