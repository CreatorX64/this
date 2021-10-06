import { Component } from "react";
import { Box } from "./Box";
import "./BoxContainer.css";

export class BoxContainer extends Component {
  static defaultProps = {
    numBoxes: 18,
    allColors: ["purple", "magenta", "violet", "pink"]
  };

  render() {
    const { numBoxes, allColors } = this.props;
    const boxes = Array.from({ length: numBoxes }, (_, idx) => (
      <Box key={idx} colors={allColors} />
    ));
    return <div className="box-container">{boxes}</div>;
  }
}
