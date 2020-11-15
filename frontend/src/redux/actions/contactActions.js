import * as types from './actionTypes';
import * as contactFormApi from '../../api/contactFormApi';
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function sendContactFormSuccess(contactForm) {
  return { type: types.SEND_CONTACT_FORM_SUCCESS, contactForm };
}

export function resetContactForm() {
  return { type: types.RESET_CONTACT_FORM };
}

export function sendContactForm(contactForm) {

  return function (dispatch) {
    dispatch(beginApiCall());
    return contactFormApi
    .saveContactFormData(contactForm)
    .then(formSendResult => {
      dispatch(sendContactFormSuccess(formSendResult))
    })
    .catch(error => {
      dispatch(apiCallError(error));
      throw error;
    })
  }

}
