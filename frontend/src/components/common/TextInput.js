import React from "react";
import PropTypes from "prop-types";

function TextInput({ name, label, onChange, placeholder, value, error }) {
  let wrapperClass = "form-group";

  if (error && error.length) {
    wrapperClass += " " + "has error";
  }

  // console.log(
  //   "TextInput: name: ",
  //   name,
  //   " value: ",
  //   value,
  //   " error: ",
  //   error,
  //   " wrapperClass: ",
  //   wrapperClass
  // );

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
};

export default TextInput;
