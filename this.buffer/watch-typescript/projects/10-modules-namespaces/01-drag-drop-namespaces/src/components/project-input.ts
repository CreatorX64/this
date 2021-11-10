/// <reference path="base-component.ts" />
/// <reference path="../decorators/bind.ts" />
/// <reference path="../utils/validation.ts" />
/// <reference path="../state/project-state.ts" />

namespace App {
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

      const titleValidatable: Validatable = {
        value: enteredTitle,
        required: true
      };
      const descriptionValidatable: Validatable = {
        value: enteredDescription,
        required: true,
        minLength: 5
      };
      const peopleValidatable: Validatable = {
        value: Number(enteredPeople),
        required: true,
        min: 1,
        max: 5
      };

      if (
        !validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(peopleValidatable)
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

    @Bind
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
}
