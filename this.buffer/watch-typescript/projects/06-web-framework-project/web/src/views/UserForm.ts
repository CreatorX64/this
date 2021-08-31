import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
  constructor(parent: Element, model: User) {
    super(parent, model);
    this.onSetAgeClick = this.onSetAgeClick.bind(this);
    this.onSetNameClick = this.onSetNameClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick,
      "click:.save-model": this.onSaveClick
    };
  }

  onSaveClick(): void {
    this.model.save();
  }

  onSetNameClick(): void {
    const input = this.parent.querySelector("input");

    if (input !== null) {
      const name = input.value;
      this.model.set({ name });
    }
  }

  onSetAgeClick(): void {
    this.model.setRandomAge();
  }

  template(): string {
    return `
      <div>
        <input type="text" class="input-name" placeholder="${this.model.get(
          "name"
        )}" />
        <button class="set-name">Update Name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save-model">Save User</button>
      </div>
    `;
  }
}
