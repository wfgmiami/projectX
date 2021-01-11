import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ContactForm from "./ContactForm";
import ContactFormSent from "./ContactFormSent";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as contactActions from "../../redux/actions/contactActions";

const styles = () => ({
  root: {},
});

class ContactPage extends Component {
  componentDidMount() {
    this.props.resetContactForm();
  }

  render() {
    const { isContactFormSent, sendContactForm } = this.props;

    console.log("contact page props", this.props, this.state);
    return (
      <div>
        {isContactFormSent ? (
          <ContactFormSent />
        ) : (
          <ContactForm onFormSend={sendContactForm} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isContactFormSent: state.contactForm.isContactFormSent,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      sendContactForm: contactActions.sendContactForm,
      resetContactForm: contactActions.resetContactForm,
    },
    dispatch
  );
}

ContactPage.propTypes = {
  sendContactForm: PropTypes.func.isRequired,
  resetContactForm: PropTypes.func.isRequired,
  isContactFormSent: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ContactPage));
