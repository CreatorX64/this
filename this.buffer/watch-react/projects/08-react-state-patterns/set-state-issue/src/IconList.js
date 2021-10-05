import { Component } from "react";

export class IconList extends Component {
  static defaultProps = {
    options: [
      "angry",
      "anchor",
      "archive",
      "at",
      "archway",
      "baby",
      "bell",
      "bolt",
      "bone",
      "car",
      "city",
      "cloud",
      "couch"
    ]
  };

  constructor(props) {
    super(props);
    this.state = { icons: ["bone", "cloud"] };
    this.addIcon = this.addIcon.bind(this);
  }

  addIcon() {
    const idx = Math.floor(Math.random() * this.props.options.length);
    const newIcon = this.props.options[idx];
    this.setState({ icons: [...this.state.icons, newIcon] });
  }

  render() {
    const icons = this.state.icons.map((icon, idx) => (
      <i key={idx} className={`fas fa-${icon}`} />
    ));
    return (
      <div>
        <h1>Icons: {icons}</h1>
        <button onClick={this.addIcon}>Add New Icon</button>
      </div>
    );
  }
}
