import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Header = (props) => {
  const activeStyle = { color: "#F15B2A" };
  const { signinStatus } = props;

  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
      {" | "}
      <NavLink to="/articles" activeStyle={activeStyle}>
        Scientific Articles
      </NavLink>
      {" | "}
      <a href='https://joshmitteldorf.scienceblog.com/' activeStyle={activeStyle}>
        Aging Matters Blog
      </a>
      {" | "}
      <a href= 'http://MyDNAge.com' activeStyle={activeStyle}>
        Zymo MyDNAge clock
      </a>
      {" | "}
      <NavLink to="/signin" activeStyle={activeStyle}>
        {signinStatus ? 'Sign Out': 'Sign In'}
      </NavLink>
      {" | "}
      <NavLink to="/contact" activeStyle={activeStyle}>
        Contact
      </NavLink>
    </nav>
  );
};


Header.propType = {
  user: PropTypes.array.isRequired,
  signinStatus: PropTypes.bool.isRequired,
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
)(Header);
