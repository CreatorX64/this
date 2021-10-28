import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Palette } from "./Palette";
import { PaletteList } from "./PaletteList";
import { seedPalettes } from "./seedPalettes";
import { generatePalette } from "./colorHelpers";

export class App extends Component {
  findPalette(id) {
    return seedPalettes.find((palette) => palette.id === id);
  }

  render() {
    return (
      <Switch>
        <Route
          path="/"
          render={() => <PaletteList palettes={seedPalettes} />}
          exact
        />
        <Route
          path="/palette/:id"
          render={(routeProps) => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
      </Switch>
      // <div className="App">
      //   <Palette palette={generatePalette(seedPalettes[4])} />
      // </div>
    );
  }
}
