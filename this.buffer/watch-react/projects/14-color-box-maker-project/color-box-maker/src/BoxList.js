import { Component } from "react";
import { Box } from "./Box";
import { NewBoxForm } from "./NewBoxForm";

export class BoxList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: []
    };
    this.addBox = this.addBox.bind(this);
  }

  addBox(box) {
    this.setState((state) => ({
      boxes: [...state.boxes, box]
    }));
  }

  removeBox(id) {
    this.setState((state) => ({
      boxes: state.boxes.filter((box) => box.id !== id)
    }));
  }

  render() {
    const boxes = this.state.boxes.map((box) => (
      <Box
        key={box.id}
        width={box.width}
        height={box.height}
        backgroundColor={box.backgroundColor}
        removeBox={() => this.removeBox(box.id)}
      />
    ));

    return (
      <div>
        <h1>Box Maker Thingy</h1>
        <NewBoxForm addBox={this.addBox} />
        {boxes}
      </div>
    );
  }
}
