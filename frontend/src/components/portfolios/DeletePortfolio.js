import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { deletePortfolio } from "../../redux/actions/portfolioActions";
import DeletePortfolioForm from "./DeletePortfolioForm";

function DeletePortfolio({ portfolioId, handleClose }) {
  const [portfolio, setPortfolio] = useState({});
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

  function resetOnClose() {
    // const portfolio = portfolios.find((port) => port.port_id === portfolioId);
    // setPortfolio(portfolio);
    setErrors({ onSave: "" });
    handleClose();
  }

  function handleDelete(event) {
    event.preventDefault();
    const port_id = portfolio.port_id;
    dispatch(deletePortfolio(port_id))
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        setErrors({ onSave: error.message });
        // resetOnClose();
      });
  }

  return (
    <DeletePortfolioForm
      port_name={portfolio.port_name}
      errors={errors}
      onDelete={handleDelete}
      handleClose={resetOnClose}
    />
  );
}

DeletePortfolio.propTypes = {
  handleClose: PropTypes.func.isRequired,
  portfolioId: PropTypes.number,
};

export default DeletePortfolio;
