import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { ShoppingListForm } from "./ShoppingListForm";

export class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: uuidv4(), name: "Milk", qty: "2 gallons" },
        { id: uuidv4(), name: "Bread", qty: "2 loaves" }
      ]
    };
    this.addItem = this.addItem.bind(this);
  }

  addItem(item) {
    let newItem = { ...item, id: uuidv4() };
    this.setState((state) => ({
      items: [...state.items, newItem]
    }));
  }

  renderItems() {
    return (
      <ul>
        {this.state.items.map((item) => (
          <li key={item.id}>
            {item.name}:{item.qty}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <h1>Shopping List</h1>
        {this.renderItems()}
        <ShoppingListForm addItem={this.addItem} />
      </div>
    );
  }
}
