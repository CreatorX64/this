import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ConnectedAddExpensePage as AddExpensePage } from "../components/AddExpensePage";
import { ConnectedEditExpensePage as EditExpensePage } from "../components/EditExpensePage";
import { ExpenseDashboardPage } from "../components/ExpenseDashboardPage";
import { Header } from "../components/Header";
import { HelpPage } from "../components/HelpPage";
import { NotFoundPage } from "../components/NotFoundPage";

export const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={ExpenseDashboardPage} exact />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);
