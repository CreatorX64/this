class App extends React.Component {
  render() {
    return (
      <div>
        <Hello
          to="Ringo"
          from="Paul"
          num={3}
          data={[1, 2, 3, 4, 5]}
          isFunny
          bangs={4}
          img="https://lh3.googleusercontent.com/_YyEJjXI8nsPSfQ-9SHgEdddB6P4nVRPp-g_5vNkDkiOLXX9d69VbtSMSLrqFxIpfEdUBFf9qSWpGFD3aEaYnCn_=w640-h400-e365-rj-sc0x00ffffff"
        />
        <Hello to="Britney" from="Adele" bangs={10} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
