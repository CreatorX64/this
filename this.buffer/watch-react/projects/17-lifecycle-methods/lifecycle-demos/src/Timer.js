import { Component } from "react";

export class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date() };
    console.log("IN CONSTRUCTOR!");
  }

  componentDidMount() {
    console.log("IN COMPONENT DID MOUNT!");
    this.timerId = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    console.log("IN COMPONENT WILL UNMOUNT!");
    clearInterval(this.timerId);
  }

  render() {
    console.log("IN RENDER!");
    return <h1>{this.state.time.getSeconds()}</h1>;
  }
}
