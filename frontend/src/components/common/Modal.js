import React from "react";
import PropTypes from "prop-types";

const Modal = ({ show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-container">{children}</div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
};
export default Modal;
