import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { ConnectedPrivateRoute as PrivateRoute } from "./PrivateRoute";
import { ConnectedPublicRoute as PublicRoute } from "./PublicRoute";
import { DashboardPage } from "../components/DashboardPage";
import { ConnectedLoginPage as LoginPage } from "../components/LoginPage";
import { NotFoundPage } from "../components/NotFoundPage";

export const history = createBrowserHistory();

export function AppRouter() {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <PublicRoute path="/" component={LoginPage} exact />
          <PrivateRoute path="/dashboard" component={DashboardPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}
