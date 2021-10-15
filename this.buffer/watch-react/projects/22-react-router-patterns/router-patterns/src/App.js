import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Food } from "./Food";
import { FoodSearch } from "./FoodSearch";
import { Meal } from "./Meal";
import { NavbarWithRouter as Navbar } from "./Navbar";
import "./App.css";

export class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Food name="Kale" />
        <Food name="Chicken" />
        <Food name="Banana" /> */}

        {/* <Route path="/food/kale" render={() => <Food name="kale" />} />
        <Route path="/food/chicken" render={() => <Food name="chicken" />} />
        <Route path="/food/banana" render={() => <Food name="banana" />} /> */}

        {/* <Route
          exact
          path="/food/:name"
          render={(routeProps) => <Food name={routeProps.match.params.name} />}
        /> */}

        {/* If you want to add additional props, you cannot use the shorthand below. */}
        {/* <Route
          exact
          path="/food/:name"
          render={(routeProps) => <Food authenticated={true} {...routeProps} />}
        /> */}

        <Navbar />
        <Switch>
          <Route path="/food/:name" component={Food} exact />
          <Route
            path="/food/:foodName/drink/:drinkName"
            component={Meal}
            exact
          />
          <Route path="/" component={FoodSearch} exact />
          {/* <Route
            path="/"
            render={(routeProps) => <FoodSearch {...routeProps} />}
            exact
          /> */}
          <Route render={() => <h1>ERROR: NOT FOUND!</h1>} />
        </Switch>
      </div>
    );
  }
}
