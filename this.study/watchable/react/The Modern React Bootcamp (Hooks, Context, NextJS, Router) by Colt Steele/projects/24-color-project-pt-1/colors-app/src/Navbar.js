import { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";

export class Navbar extends Component {
  render() {
    const { level, changeLevel } = this.props;

    return (
      <header className="Navbar">
        <div className="logo">
          <a href="#!">React Color Picker</a>
        </div>
        <div className="slider-container">
          <span>Level: {level}</span>
          <div className="slider">
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onChange={changeLevel}
              // onAfterChange={changeLevel}
            />
          </div>
        </div>
      </header>
    );
  }
}
