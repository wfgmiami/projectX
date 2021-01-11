import React from "react";
import { connect } from "react-redux";
import * as portfolioActions from "../../redux/actions/portfolioActions";
import * as holdingActions from "../../redux/actions/holdingAction";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import PortfolioList from "./PortfolioList";
import { Link } from "react-router-dom";

class PortfoliosPage extends React.Component {
  componentDidMount() {
    const { portfolios } = this.props;

    if (portfolios.portfoliosList.length === 0) {
      this.props.loadPortfolios().catch((error) => {
        alert("Loading courses failed " + error);
      });
    }
  }

  render() {
    console.log(
      "frontend/src/components/portfolios/PortfolioPage: this.props: ",
      this.props
    );
    const portfolios = this.props.portfolios.portfoliosList;

    return (
      <>
        <Link to="/createportfolio">Create Portflio</Link>
        <PortfolioList portfolios={portfolios} />
      </>
    );
  }
}

function mapStateToProps(state) {
  // function mapStateToProps({ portfolios }){
  //   return portfolios
  // }
  return {
    portfolios: state.portfolios,
  };
}
// state: { portfolio_list: [ {portfolio_id: 1, name: 'main', createdAt:'' },
//           {portfolio_id: 2, name: 'all', createdAt:'' },]
// porfoliosLoadedStatus: "success"
// error: {}__li
//         }

function mapDispatchToProps(dispatch) {
  return {
    // portfolios: portfolioActions.createPortfolio
    loadPortfolios: bindActionCreators(
      portfolioActions.loadPortfolios,
      dispatch
    ),
    loadPortfoliHolding: bindActionCreators(
      holdingActions.loadPortfolioHolding,
      dispatch
    ),
    // createPortfolio: (portfolio) => dispatch(portfolioActions.createPortfolio(portfolio)),
  };
}

PortfoliosPage.propTypes = {
  loadPortfolios: PropTypes.func.isRequired,
  loadPortfolioHolding: PropTypes.func.isRequired,
  portfolios: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfoliosPage);
