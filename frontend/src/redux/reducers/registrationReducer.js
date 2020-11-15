import * as types from '../actions/actionTypes';
import initialState from './initialState';



export default function ( state = initialState.registerUser, action ) {
  console.log('registrationReducer: initialState:', initialState)
  switch( action.type ){

    case types.SUCCESS_CANDIDATE_REGISTRATION:
    {
      return {
        ...state,
        applicationSuccess: true
      }
    }
    case types.SET_CANDIDATE_ATTRIBUTES:
    {
      return {
        ...state,
        ...action.attribute
      }
    }
    default:
    {
      return state;
    }
  }
}

