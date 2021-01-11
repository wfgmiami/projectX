import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import InputMask from "react-input-mask";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { validateRegister } from "../common/validate";
import { usStates } from "../../assets/static/us-states";

import * as registrationActions from "../../redux/actions/registrationActions";

const styles = (theme) => ({
  root: {},
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "45%",
  },
  textFieldBox: {
    width: "5%",
    marginLeft: theme.spacing.unit,
  },
  violationQuestions: {
    paddingTop: "3em",
    float: "right",
    width: "50%",
    background: "green",
  },
  boxName: {
    background: "yellow",
  },
  numField: {},
  formControl: {
    margin: theme.spacing.unit,
    width: "45%",
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class RegisterPage extends Component {
  handleSubmit = () => {
    let errorMsg = null;
    const registerUser = this.props.registerUser;

    const validationObj = validateRegister(registerUser);
    const validationArray = Object.keys(validationObj);
    const requiredViolation = validationArray.findIndex(
      (field) => validationObj[field] === "Required"
    );

    errorMsg =
      validationObj.email === "Invalid email address"
        ? "Invalid email address"
        : null;
    errorMsg =
      validationObj.phone === "Invalid phone number"
        ? "Invalid phone number"
        : null;

    errorMsg =
      validationObj.dob === "Invalid birthdate" ? "Invalid birthdate" : null;

    if (requiredViolation !== -1) {
      let field = "";
      switch (validationArray[requiredViolation]) {
        case "firstName":
          field = "First Name";
          break;
        case "lastName":
          field = "Last Name";
          break;
        case "phone":
          field = "Phone";
          break;
        case "streetAddress":
          field = "Street Address";
          break;
        case "city":
          field = "City";
          break;
        case "state":
          field = "State";
          break;
        case "zipCode":
          field = "Zip Code";
          break;
        default:
          field = "";
      }
      // errorMsg = validationArray[requiredViolation] + " is a required field";
      errorMsg = field + " is a required field";
    }

    if (!errorMsg) {
      // this.props.onCreate(registerUser);
      this.props.setRegisterUser(registerUser);
    } else {
      alert(errorMsg);
    }
  };

  handleChange = (key) => ({ target: { value } }) => {
    this.props.setRegisterUserAttributes({ [key]: value });
  };

  render() {
    const { classes, registerUser } = this.props;
    console.log("RegisterPage: this.props:", this.props);
    return (
      <React.Fragment>
        <form>
          <TextField
            id="userName"
            label="Username"
            className={classes.textField}
            value={registerUser.username}
            onChange={this.handleChange("username")}
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            className={classes.textField}
            value={registerUser.password}
            onChange={this.handleChange("password")}
            margin="normal"
          />
          <TextField
            id="firstName"
            label="First Name"
            className={classes.textField}
            value={registerUser.firstName}
            onChange={this.handleChange("firstName")}
            margin="normal"
          />
          <TextField
            id="lastName"
            label="Last Name"
            className={classes.textField}
            value={registerUser.lastName}
            onChange={this.handleChange("lastName")}
            margin="normal"
          />
          <TextField
            id="email"
            label="Email"
            className={classes.textField}
            value={registerUser.email}
            onChange={this.handleChange("email")}
            margin="normal"
          />

          <InputMask
            mask="(999) 999 9999"
            maskChar="-"
            value={registerUser.phone}
            onChange={this.handleChange("phone")}
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
            id="streetAddress"
            lavel="Street Address"
            className={classes.textField}
            value={registerUser.streetAddress}
            placeholder={"Street Address"}
            onChange={this.handleChange("streetAddress")}
            margin="normal"
          />
          <TextField
            id="city"
            label="City"
            className={classes.textField}
            value={registerUser.city}
            onChange={this.handleChange("city")}
            margin="normal"
          />

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="state-simple">State</InputLabel>
            <Select
              value={registerUser.state}
              onChange={this.handleChange("state")}
              inputProps={{
                name: "state",
                id: "state-simple",
              }}
            >
              {Object.keys(usStates).map((stateAbbr, id) => (
                <MenuItem key={id} value={stateAbbr}>
                  {usStates[stateAbbr]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="zipCode"
            label="Zip Code"
            inputProps={{ maxLength: 5 }}
            className={classes.textField}
            value={registerUser.zipCode}
            onChange={this.handleChange("zipCode")}
            margin="normal"
          />

          <div>&nbsp;</div>
        </form>
        <br />
        <br />
        <Button
          color="primary"
          variant="raised"
          onClick={() => this.handleSubmit()}
        >
          Register
        </Button>
      </React.Fragment>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
  registerUser: PropTypes.object.isRequired,
  setRegisterUser: PropTypes.func.isRequired,
  setRegisterUserAttributes: PropTypes.func.isRequired,
};

function mapStateToProps({ registerUser }) {
  return {
    registerUser,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setRegisterUserAttributes: registrationActions.setRegisterUserAttributes,
      setRegisterUser: registrationActions.setRegisterUser,
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterPage))
);
