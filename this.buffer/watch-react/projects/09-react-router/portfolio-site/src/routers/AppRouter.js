import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ContactPage } from "../components/ContactPage";
import { Header } from "../components/Header";
import { HomePage } from "../components/HomePage";
import { NotFoundPage } from "../components/NotFoundPage";
import { PortfolioItemPage } from "../components/PortfolioItemPage";
import { PortfolioPage } from "../components/PortfolioPage";

export const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/portfolio" component={PortfolioPage} exact />
        <Route path="/portfolio/:id" component={PortfolioItemPage} />
        <Route path="/contact" component={ContactPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);
