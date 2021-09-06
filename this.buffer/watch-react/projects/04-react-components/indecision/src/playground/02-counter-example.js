class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.reset = this.reset.bind(this);

    this.state = { count: 0 };
  }

  handleAddOne() {
    this.setState((prevState) => {
      return {
        count: prevState.count + 1
      };
    });
  }

  handleMinusOne() {
    this.setState((prevState) => {
      return {
        count: prevState.count - 1
      };
    });
  }

  reset() {
    this.setState(() => {
      return {
        count: 0
      };
    });

    // This is the old syntax of setting the state of a component. This syntax
    // is not preferred anymore and it is expected to be deprecated at some
    // point. The reason why this is not preferred is because this.setState()
    // is an async operation, so calling them back to back using this old syntax
    // will not give the expected result all the time. For instance, by the time
    // the first setState updates the count state, the second call might already
    // have retrieved this.state.count. Instead, if the next state depends on
    // the current state, it is recommended to use the updater function form.
    // Read more: https://stackoverflow.com/questions/48209452/when-to-use-functional-setstate
    // this.setState({ count: 0 });
    // this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.handleAddOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.reset}>reset</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.querySelector("#app"));
