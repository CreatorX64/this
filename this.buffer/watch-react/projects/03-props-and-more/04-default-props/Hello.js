class Hello extends React.Component {
  static defaultProps = {
    bangs: 1,
    img: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
    from: "Anonymous"
  };

  render() {
    let bangs = "!".repeat(this.props.bangs);
    return (
      <p>
        <p>
          Hi {this.props.to} from {this.props.from}
          {bangs}
        </p>
        <img src={this.props.img} />
      </p>
    );
  }
}
