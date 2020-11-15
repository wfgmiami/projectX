import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SignoutPage from "./SignoutPage";
import SigninForm from "./SigninForm";

function SigninPage(props) {
  const { signinStatus } = props;
  return <>
      { !signinStatus ?  <SigninForm {...props} /> : <SignoutPage /> }
    </>
}


SigninPage.propType = {
  user: PropTypes.array.isRequired,
  logStatus: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {

  return {
   user: state.user,
   signinStatus: state.user.signinStatus
  };
}


export default connect(
  mapStateToProps,
  null
)(SigninPage);
