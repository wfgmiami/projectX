import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import Nav from "./common/Nav";
import ArticlesPage from "./articles/ArticlesPage";
import PageNotFound from "./PageNotFound";
import SigninPage from "./signin/SigninPage";
import RegisterPage from "./signin/RegisterPage";
import ContactPage from "./contact/ContactPage";
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/articles" component={ArticlesPage} />
        <Route path="/signin" component={SigninPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/contact" component={ContactPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}


export default App;
