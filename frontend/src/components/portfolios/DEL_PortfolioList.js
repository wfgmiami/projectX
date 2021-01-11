import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DropdownMenu from "../common/DEL_DropdownMenu";
import settingsIcon from "../../assets/images/settingsIcon.png";

const PortfolioList = ({ portfolios }) => {
  console.log(
    "frontend/src/components/PortfolioList: portfolios: ",
    portfolios
  );
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Portfolio Name</th>
          <th>Symbols</th>
          <th>Market Value</th>
          <th>Day Change</th>
          <th>Day Change %</th>
          <th>Total Change</th>
          <th>Total Change %</th>
        </tr>
      </thead>

      <tbody>
        {portfolios.map((portfolio) => {
          let mv = Number(portfolio.mv).toFixed(2);
          let ugl = Number(portfolio.ugl).toFixed(2);
          mv = Number(mv).toLocaleString("en");
          ugl = Number(ugl).toLocaleString("en");

          return (
            <tr key={portfolio.port_id}>
              <td>
                <Link to={`/portfolios/${portfolio.port_id}`}>
                  {portfolio.port_name}
                </Link>
              </td>
              <td>{portfolio.symbols}</td>
              <td>{mv}</td>
              <td></td>
              <td></td>
              <td>{ugl}</td>
              <td></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

PortfolioList.propTypes = {
  portfolios: PropTypes.array.isRequired,
};

export default PortfolioList;
