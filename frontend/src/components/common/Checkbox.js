/* eslint-disable react/display-name */
import React from "react";
import PropTypes from "prop-types";

export const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  const disabled = rest.disabled;
  let props = rest;

  if (disabled) {
    props = { ...rest, style: { cursor: "default" } };
  }

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...props} />
    </>
  );
});

Checkbox.propTypes = {
  indeterminate: PropTypes.bool.isRequired,
};
