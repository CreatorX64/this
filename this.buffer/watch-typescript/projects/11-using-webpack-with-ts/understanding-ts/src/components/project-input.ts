import { Component } from "./base-component";
import { Bind as autobind } from "../decorators/bind";
import * as Validation from "../utils/validation";
import { projectState } from "../state/project-state";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInputElement = this.htmlContent.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.htmlContent.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.htmlContent.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
  }

  configure(): void {
    this.htmlContent.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  private gatherUserInput(): [string, string, number] | null {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true
    };
    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    };
    const peopleValidatable: Validation.Validatable = {
      value: Number(enteredPeople),
      required: true,
      min: 1,
      max: 5
    };

    if (
      !Validation.validate(titleValidatable) ||
      !Validation.validate(descriptionValidatable) ||
      !Validation.validate(peopleValidatable)
    ) {
      alert("Invalid input, please try again.");
      return null;
    } else {
      return [enteredTitle, enteredDescription, Number(enteredPeople)];
    }
  }

  private clearInputs(): void {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @autobind
  private submitHandler(event: Event): void {
    event.preventDefault();

    const userInput = this.gatherUserInput();

    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
      this.clearInputs();
    }
  }
}
