import React from 'react';
import { signoutUser } from '../../redux/actions/userActions';
import { connect } from "react-redux";


function SignoutPage (props) {

  const submitHandler = (e) => {
    e.preventDefault();
    props.signoutUser()
  }

  return (
    <form className="form" onSubmit={submitHandler}>
        <ul className="form-container">
          <h2>You are currently signed in!</h2>
          <button type="submit" className="button primary">Sign out</button>
        </ul>
    </form>
  )
}

  const mapDispatchToProps = {
    signoutUser
  };


export default connect(
  null,
  mapDispatchToProps
)(SignoutPage);
