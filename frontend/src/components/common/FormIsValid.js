import PropTypes from "prop-types";

export function formIsValid(portfolio, setErrors) {
  const { port_name } = portfolio;
  const errors = {};
  console.log(
    "formIsValid: portfolio: ",
    portfolio,
    " !port_name: ",
    !port_name
  );

  if (!port_name) errors.port_name = "Portfolio name is required.";
  setErrors(errors);
  return Object.keys(errors).length === 0;
}

formIsValid.propTypes = {
  portfolio: PropTypes.object.isRequired,
  setErrors: PropTypes.func.isRequired,
};

export function transactionIsValid(transaction, setErrors, rowIndex) {
  const { trade_date, shares, purchase_price } = transaction;
  const errors = {};

  if (!trade_date) errors.trade_date = "Trade date is required.";
  if (!shares) errors.shares = "Shares is required.";
  if (!purchase_price) errors.purchase_price = "Purchase price is required.";
  const isValid = Object.keys(errors).length === 0;
  if (!isValid) errors.row_index = rowIndex;

  setErrors(errors);
  return isValid;
}

// export function symbolIsValid(symbol, port_id, setErrors) {
// check if symbol exist already in the same portfolio
// }
