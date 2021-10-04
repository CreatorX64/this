import { Component } from "react";
import "./Dog.css";
import puppy from "./puppy.jpg";

export class Dog extends Component {
  render() {
    return (
      <div className="Dog">
        <h1>DOG!</h1>
        <img className="Dog-img" src={puppy} alt="Terrier puppy" />
      </div>
    );
  }
}
