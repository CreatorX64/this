import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { ConnectedPrivateRoute as PrivateRoute } from "./PrivateRoute";
import { ConnectedPublicRoute as PublicRoute } from "./PublicRoute";
import { ConnectedAddExpensePage as AddExpensePage } from "../components/AddExpensePage";
import { ConnectedEditExpensePage as EditExpensePage } from "../components/EditExpensePage";
import { ExpenseDashboardPage } from "../components/ExpenseDashboardPage";
import { ConnectedLoginPage as LoginPage } from "../components/LoginPage";
import { NotFoundPage } from "../components/NotFoundPage";

export const history = createBrowserHistory();

export function AppRouter() {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <PublicRoute path="/" component={LoginPage} exact />
          <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
          <PrivateRoute path="/create" component={AddExpensePage} />
          <PrivateRoute path="/edit/:id" component={EditExpensePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}
