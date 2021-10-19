import { Component } from "react";
import { ColorBox } from "./ColorBox";
import "./Palette.css";

export class Palette extends Component {
  render() {
    const colorBoxes = this.props.colors.map((color) => (
      <ColorBox backgroundColor={color.color} name={color.name} />
    ));

    return (
      <div className="Palette">
        {/* Navbar goes here */}
        <div className="Palette__colors">{colorBoxes}</div>
        {/* Footer */}
      </div>
    );
  }
}
