import { Component } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import { About } from "./About";
import { Contact } from "./Contact";
import { Dog } from "./Dog";
import "./App.css";

function Hater() {
  return <h1>I ABSOLUTELY HATE DOGS!</h1>;
}

export class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="App-nav">
          <NavLink exact activeClassName="active-link" to="/">
            About
          </NavLink>
          <NavLink exact activeClassName="active-link" to="/dog">
            Dog
          </NavLink>
          <NavLink exact activeClassName="active-link" to="/dog/r">
            Dog (r)
          </NavLink>
          <NavLink exact activeClassName="active-link" to="/dog/c">
            Dog (c)
          </NavLink>
          <NavLink exact activeClassName="active-link" to="/contact">
            Contact
          </NavLink>

          {/* <Link to="/">About</Link>
          <Link to="/dog">Dog</Link>
          <Link to="/contact">Contact</Link> */}
        </nav>
        {/* Since all our routes are "exact", we don't really need the Switch
        here. I'll still keep it for future reference. */}
        <Switch>
          <Route exact path="/" component={About} />

          <Route exact path="/dog" component={Dog} />
          {/* As per React Router docs: When you use component (instead of
          render or children, below) the router uses React.createElement to
          create a new React element from the given component. That means if
          you provide an inline function to the component prop, you would
          create a new component every render. This results in the existing
          component unmounting and the new component mounting instead of just
          updating the existing component. When using an inline function for
          inline rendering, use the render or the children prop */}
          <Route exact path="/dog/c" component={() => <Dog name="Muffins" />} />
          <Route exact path="/dog/r" render={() => <Dog name="Biscuits" />} />

          <Route exact path="/dog/hater" component={Hater} />
          <Route exact path="/contact" component={Contact} />
        </Switch>
      </div>
    );
  }
}
