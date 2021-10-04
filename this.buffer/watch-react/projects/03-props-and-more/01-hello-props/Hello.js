class Hello extends React.Component {
  render() {
    // console.log(this.props);

    // You shouldn't alter props.
    // this.props.from = "blue";

    let bangs = "!".repeat(this.props.bangs);

    return (
      <p>
        <p>
          Hi {this.props.to} from {this.props.from} {bangs}
        </p>
        <img src={this.props.img} />
      </p>
    );
  }
}
