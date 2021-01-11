import React from "react";
import { Route, Switch } from "react-router-dom";
// import HomePage from "./home/HomePage";
// import AboutPage from "./about/AboutPage";
// import Nav from "./common/Nav";

import Header from "./common/Header";
// import PortfolioPage from "./portfolios/PortfolioPage";
import PortfolioTable from "./portfolios/PortfolioTable";
import PageNotFound from "./PageNotFound";
import SigninPage from "./signin/SigninPage";
import RegisterPage from "./signin/RegisterPage";
import ContactPage from "./contact/ContactPage";
import HoldingTable from "./holdings/HoldingTable";
// import CreatePortfolio from "./portfolios/CreatePortfolio";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={PortfolioTable} />
        <Route path="/portfolios/:portfolio_id" component={HoldingTable} />
        {/* <Route path="/createportfolio" component={CreatePortfolio} /> */}
        <Route path="/signin" component={SigninPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/contact" component={ContactPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
