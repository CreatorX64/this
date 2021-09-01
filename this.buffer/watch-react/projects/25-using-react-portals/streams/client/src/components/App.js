import React from "react";
import { Route, Router } from "react-router-dom";
import { Header } from "./Header";
import { history } from "../history";
import { ConnectedStreamCreate } from "./streams/StreamCreate";
import { ConnectedStreamDelete } from "./streams/StreamDelete";
import { ConnectedStreamEdit } from "./streams/StreamEdit";
import { ConnectedStreamList } from "./streams/StreamList";
import { StreamShow } from "./streams/StreamShow";

export const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={ConnectedStreamList} />
          <Route path="/streams/new" exact component={ConnectedStreamCreate} />
          <Route
            path="/streams/edit/:id"
            exact
            component={ConnectedStreamEdit}
          />
          <Route
            path="/streams/delete/:id"
            exact
            component={ConnectedStreamDelete}
          />
          <Route path="/streams/show" exact component={StreamShow} />
        </div>
      </Router>
    </div>
  );
};
