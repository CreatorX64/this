import { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Food.css";

export class Food extends Component {
  render() {
    // const { name } = this.props;
    const { name } = this.props.match.params;

    const url = `https://source.unsplash.com/1600x900/?${name}`;

    return (
      <div className="Food">
        {/\d/.test(name) ? (
          // Use Redirect component when you don't want user to be able to use
          // browser buttons to go back to the previous page. Perhaps that page
          // was the page that checked an invalid input and redirected in the
          // first place, so you don't want user to be able to go back there
          // just to get redirected again. In all other cases (something got
          // updated/created/deleted, etc.) you can use the history object
          // to redirect which allows user to go back.
          <Redirect to="/" />
        ) : (
          <div>
            <h1>I love to eat {name}</h1>
            <img src={url} alt={name} />
          </div>
        )}
      </div>
    );
  }
}
