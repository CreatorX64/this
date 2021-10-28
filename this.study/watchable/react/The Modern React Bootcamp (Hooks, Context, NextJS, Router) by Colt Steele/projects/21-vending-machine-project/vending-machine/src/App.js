import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Chips } from "./Chips";
import { Sardines } from "./Sardines";
import { Soda } from "./Soda";
import { VendingMachine } from "./VendingMachine";
import "./App.css";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={VendingMachine} />
          <Route exact path="/soda" component={Soda} />
          <Route exact path="/sardines" component={Sardines} />
          <Route exact path="/chips" component={Chips} />
        </Switch>
      </div>
    );
  }
}
