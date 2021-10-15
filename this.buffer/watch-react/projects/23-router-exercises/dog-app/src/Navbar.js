import { Component } from "react";
import { Link, NavLink } from "react-router-dom";

export class Navbar extends Component {
  render() {
    const dogLinks = this.props.dogs.map((dog) => (
      <li key={dog.name} className="nav-item">
        <NavLink
          to={`/dogs/${dog.name}`}
          className="nav-link"
          activeClassName="active"
          exact
        >
          {dog.name}
        </NavLink>
      </li>
    ));

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/dogs" className="navbar-brand">
            Dog App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <NavLink
                to="/dogs"
                className="nav-link"
                activeClassName="active"
                exact
              >
                Home
              </NavLink>
              {dogLinks}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
