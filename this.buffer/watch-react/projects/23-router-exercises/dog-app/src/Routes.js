import { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { DogList } from "./DogList";
import { DogDetails } from "./DogDetails";

export class Routes extends Component {
  constructor(props) {
    super(props);
    this.getDog = this.getDog.bind(this);
  }

  getDog(props) {
    const name = props.match.params.name;
    const currentDog = this.props.dogs.find(
      (dog) => dog.name.toLowerCase() === name.toLowerCase()
    );
    return <DogDetails {...props} dog={currentDog} />;
  }

  render() {
    return (
      <Switch>
        <Route
          path="/dogs"
          render={() => <DogList dogs={this.props.dogs} />}
          exact
        />
        <Route path="/dogs/:name" render={this.getDog} exact />
        <Redirect to="/dogs" />
      </Switch>
    );
  }
}
