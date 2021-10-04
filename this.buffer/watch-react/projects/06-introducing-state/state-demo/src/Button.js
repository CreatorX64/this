import { Component } from "react";

export class Button extends Component {
  render() {
    return <button onClick={() => alert("CLICKED!!")}>Click Me!</button>;
  }
}
