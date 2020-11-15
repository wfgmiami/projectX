import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function contactReducer(state = initialState.contactForm, action) {

  switch(action.type) {
    case types.SEND_CONTACT_FORM_SUCCESS:
      return {...state, isContactFormSent: true };
    case types.RESET_CONTACT_FORM:
      return {...state, isContactFormSent: false };
    default:
      return state;
  }

}

