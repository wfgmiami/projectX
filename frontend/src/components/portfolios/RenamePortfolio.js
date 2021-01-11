import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { createPortfolio } from "../../redux/actions/portfolioActions";
import RenamePortfolioForm from "./RenamePortfolioForm";
import { formIsValid } from "../common/FormIsValid";

function RenamePortfolio({ portfolioId, handleClose }) {
  const [portfolio, setPortfolio] = useState({ port_name: "" });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const portfolios = useSelector((state) => state.portfolios.portfoliosList);

  // console.log("portfolios: ", portfolios);

  useEffect(() => {
    if (portfolioId) {
      const portfolio = portfolios.find((port) => port.port_id === portfolioId);
      setPortfolio(portfolio);
    }
  }, [portfolioId]);

  function handleChange(event) {
    const { value } = event.target;

    const renamedPortfolio = { ...portfolio, port_name: value };
    // console.log(
    //   "handleChange: name: ",
    //   name,
    //   " value: ",
    //   value,
    //   " renamedPortfolio: ",
    //   renamedPortfolio
    // );

    setPortfolio(renamedPortfolio);
  }

  function resetOnClose() {
    const portfolio = portfolios.find((port) => port.port_id === portfolioId);
    setPortfolio(portfolio);
    setErrors({ onSave: "" });
    handleClose();
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid(portfolio, setErrors)) return;

    dispatch(createPortfolio(portfolio))
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        setErrors({ onSave: error.message });
        // resetOnClose();
      });
  }

  return (
    <RenamePortfolioForm
      port_name={portfolio.port_name}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      handleClose={resetOnClose}
    />
  );
}

RenamePortfolio.propTypes = {
  handleClose: PropTypes.func.isRequired,
  portfolioId: PropTypes.number,
};

export default RenamePortfolio;
