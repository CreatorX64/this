import { Component } from "react";
import axios from "axios";
import "./ZenQuote.css";

export class ZenQuote extends Component {
  constructor(props) {
    super(props);
    console.log("INSIDE CONSTRUCTOR");
    this.state = { quote: "", isLoaded: false };
  }

  componentDidMount() {
    console.log("INSIDE COMPONENT DID MOUNT");
    axios.get("https://api.github.com/zen").then((res) => {
      setTimeout(() => {
        this.setState({ quote: res.data, isLoaded: true });
      }, 3000);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("INSIDE COMPONENT DID UPDATE", prevProps, prevState);
  }

  render() {
    console.log("INSIDE RENDER");
    return (
      <div>
        {this.state.isLoaded ? (
          <div>
            <h1>Always remember...</h1>
            <p>{this.state.quote}</p>
          </div>
        ) : (
          <div className="loader"></div>
        )}
      </div>
    );
  }
}
