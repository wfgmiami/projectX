import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import {
  loadPortfolios,
  createPortfolio,
} from "../../redux/actions/portfolioActions";
import CreatePortfolioForm from "./CreatePortfolioForm";
import { formIsValid } from "../common/FormIsValid";

function CreatePortfolio({
  createPortfolio,
  portfolioCurrency,
  portfolioAssetClass,
  handleClose,
  ...props
}) {
  const [portfolio, setNewPortfolio] = useState({ ...props.portfolio });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // console.log("portfolio: ", portfolio, " props: ", props);

  function handleChange(event) {
    const { name, value } = event.target;

    // console.log("handleChange: name: ", name, " value: ", value);

    setNewPortfolio((prevPortfoliio) => ({
      ...prevPortfoliio,
      [name]: value,
    }));
  }

  function resetOnClose() {
    setNewPortfolio({ ...props.portfolio });
    setErrors({ onSave: "" });
    handleClose();
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid(portfolio, setErrors)) return;
    setSaving(true);
    createPortfolio(portfolio)
      .then(() => {
        setSaving(false);
        resetOnClose();
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
        // resetOnClose();
      });
  }

  // function formIsValid() {
  //   const { port_name } = portfolio;
  //   const errors = {};

  //   if (!port_name) errors.port_name = "Portfolio name is required.";
  //   setErrors(errors);
  //   return Object.keys(errors).length === 0;
  // }

  return (
    <CreatePortfolioForm
      portfolioAssetClass={portfolioAssetClass}
      portfolioCurrency={portfolioCurrency}
      portfolio={portfolio}
      errors={errors}
      handleClose={resetOnClose}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

CreatePortfolio.propTypes = {
  createPortfolio: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  loadPortfolios: PropTypes.func.isRequired,
  portfolio: PropTypes.object.isRequired,
  portfolios: PropTypes.array.isRequired,
  portfolioCurrency: PropTypes.array.isRequired,
  portfolioAssetClass: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    portfolios: state.portfolios.portfoliosList,
    portfolio: state.portfolios.newPortfolio,
    portfolioCurrency: state.portfolios.currency,
    portfolioAssetClass: state.portfolios.asset_class,
  };
}

const mapDispatchToProps = {
  loadPortfolios,
  createPortfolio,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreatePortfolio)
);
