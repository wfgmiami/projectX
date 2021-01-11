import React, { useState } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { authUser } from "../../redux/actions/userActions";
import PropTypes from "prop-types";

function SigninForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const userSignin = useSelector(state => state.userSignin);

  // const { loading, userInfo, error } = userSignin;
  // const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  // useEffect(() => {
  //   if (userInfo) {
  //     props.history.push(redirect);
  //   }
  //   return () => {
  //     //
  //   };
  // }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    props.authUser(email, password);
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Sign-In</h2>
          </li>
          <li>
            {/* {loading && <div>Loading...</div>} */}
            {props.authStatus === "Fail" && (
              <div style={{ color: "red" }}>Incorrect Sign in...Try Again</div>
            )}
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </li>
          <li>
            <button type="submit" className="button primary">
              Sign in
            </button>
          </li>
          <li>New to Data-BETA?</li>
          <li>
            <Link
              to={
                redirect === "/" ? "register" : "register?redirect=" + redirect
              }
              className="button secondary text-center"
            >
              Create your Data-BETA account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

SigninForm.propType = {
  user: PropTypes.array.isRequired,
  authStatus: PropTypes.object,
  location: PropTypes.object.isRequired,
  authUser: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const authStatus = state.user.authStatus ? state.user.authStatus : null;

  return {
    user: state.user,
    authStatus,
  };
}

const mapDispatchToProps = {
  authUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);
