import { Component } from "react";
import { Link } from "react-router-dom";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";

export default class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.state = { format: "hex" };
    this.changeFormat = this.changeFormat.bind(this);
  }

  gatherShades(palette, colorId) {
    let shades = [];
    const { colors } = palette;

    for (let key in colors) {
      shades = shades.concat(
        colors[key].filter((color) => color.id === colorId)
      );
    }

    return shades.slice(1); // Skip #fff
  }

  changeFormat(format) {
    this.setState({ format });
  }

  render() {
    const { format } = this.state;
    const { id, paletteName, emoji } = this.props.palette;
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        key={color.name} // In this component, all color IDs are the same.
        name={color.name}
        backgroundColor={color[format]}
        showFullPalette={false}
      />
    ));

    return (
      <div className="SingleColorPalette Palette">
        <Navbar changeFormat={this.changeFormat} showAllColors={false} />
        <div className="Palette-colors">
          {colorBoxes}
          <div className="ColorBox go-back">
            <Link to={`/palette/${id}`} className="back-button">
              Go Back
            </Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}
