import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";


import classNames from "classnames";
import { validateContactForm } from "./validate";
import InputMask from "react-input-mask";

const styles = theme => ({
  root: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "space-between"
    }
  },
  flexContainer: {
    margin: "20px auto 0 auto"
  },
  flexSection: {
    padding: "20px",
    boxSizing: "border-box",
    flexBasis: "1000%",
    marginBottom: "20px"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "45%"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class ContactUsForm extends Component {
  state = {
    contact: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      comment: ""
    }
  };

  handleSendMessage = () => {
    let errorMsg = null;
    const { contact } = this.state;

    const validationObj = validateContactForm(this.state.contact);
    const validationArray = Object.keys(validationObj);
    const requiredViolation = validationArray.findIndex(
      field => validationObj[field] === "Required"
    );

    errorMsg =
      validationObj.email === "Invalid email address"
        ? "Invalid email address"
        : null;
    errorMsg =
      validationObj.phone === "Invalid phone number"
        ? "Invalid phone number"
        : null;

    if (requiredViolation !== -1)
      errorMsg = validationArray[requiredViolation] + " is a required field";

    if (!errorMsg) this.props.onFormSend(contact);
    else alert(errorMsg);
  };

  handleChange = key => ({ target: { value } }) => {
    this.setState({
      contact: {
        ...this.state.contact,
        [key]: value
      }
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classNames(classes.root, classes.flexContainer)}>
          <div className={classes.flexSection}>
            <h2 className="py-16">CONTACT FORM</h2>
            <br />
            <form>
              <TextField
                id="firstName"
                label="First Name"
                className={classes.textField}
                value={this.state.contact.firstName}
                onChange={this.handleChange("firstName")}
                margin="normal"
              />
              <TextField
                id="lastName"
                label="Last Name"
                className={classes.textField}
                value={this.state.contact.lastName}
                onChange={this.handleChange("lastName")}
                margin="normal"
              />
              <TextField
                id="email"
                label="Email"
                className={classes.textField}
                value={this.state.contact.email}
                onChange={this.handleChange("email")}
                margin="normal"
              />
              <InputMask
                mask="999 999 9999"
                maskChar="-"
                value={this.state.contact.phone}
                onChange={this.handleChange("phone")}
                className={classes.textField}
              >
                {() => (
                  <TextField
                    id="phone"
                    label="Phone"
                    className={classes.textField}
                    margin="normal"
                    type="text"
                  />
                )}
              </InputMask>
              <TextField
                multiline
                rows="5"
                label="Comment"
                className={classes.textField}
                value={this.state.contact.driverslicense}
                onChange={this.handleChange("comment")}
                margin="normal"
              />
            </form>
            <br />
            <br />
            <Button
              color="primary"
              variant="raised"
              onClick={() => this.handleSendMessage()}
            >
              SEND MESSAGE
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ContactUsForm);
