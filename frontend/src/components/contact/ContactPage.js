import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ContactForm from "./ContactForm";
import ContactFormSent from "./ContactFormSent";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as contactActions from '../../redux/actions/contactActions';


const styles = theme => ({
  root: {}
});

class ContactPage extends Component {

  componentDidMount() {
    this.props.resetContactForm();
  }

  render() {

    const { isContactFormSent, sendContactForm  } = this.props;


    console.log('contact page props', this.props, this.state)
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
      resetContactForm: contactActions.resetContactForm
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ContactPage));
