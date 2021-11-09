// Project state management

class ProjectState {
  private projects: any[] = [];
  private listeners: any[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProjectState();
    }
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    this.projects.push({
      id: Math.random().toString(),
      title,
      description,
      people: numOfPeople
    });
    this.notifyListeners();
  }

  addListener(listenerFn: Function) {
    this.listeners.push(listenerFn);
  }

  private notifyListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();

// Validation

interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable): boolean {
  let isValid = true;

  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  // Note that the "!=" operator helps us to check a value against both null and undefined.
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }

  return isValid;
}

// Decorators

function Bind(
  _1: any,
  _2: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  return {
    configurable: true,
    enumerable: false,
    get() {
      return descriptor.value.bind(this);
    }
  };
}

// Components

class ProjectList {
  hostElement: HTMLDivElement;
  templateElement: HTMLTemplateElement;
  htmlContent: HTMLElement;
  assignedProjects: any[];

  constructor(private type: "active" | "finished") {
    this.hostElement = document.getElementById("app") as HTMLDivElement;
    this.templateElement = document.getElementById(
      "project-list"
    ) as HTMLTemplateElement;
    this.assignedProjects = [];

    const nodeCopy = document.importNode(this.templateElement.content, true);
    this.htmlContent = nodeCopy.firstElementChild as HTMLElement;
    this.htmlContent.id = `${this.type}-projects`;

    projectState.addListener((projects: any[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }

  private attach(): void {
    this.hostElement.insertAdjacentElement("beforeend", this.htmlContent);
  }

  private renderProjects() {
    const listElem = document.getElementById(
      `${this.type}-projects-list`
    ) as HTMLUListElement;

    for (const projectItem of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = projectItem.title;
      listElem.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    const headerTitle = `${this.type.toUpperCase()} PROJECTS`;
    this.htmlContent.querySelector("ul")!.id = listId;
    this.htmlContent.querySelector("h2")!.textContent = headerTitle;
  }
}

class ProjectInput {
  hostElement: HTMLDivElement;
  templateElement: HTMLTemplateElement;
  htmlContent: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.hostElement = document.getElementById("app") as HTMLDivElement;
    this.templateElement = document.getElementById(
      "project-input"
    ) as HTMLTemplateElement;

    const nodeCopy = document.importNode(this.templateElement.content, true);
    this.htmlContent = nodeCopy.firstElementChild as HTMLFormElement;
    this.htmlContent.id = "user-input";

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
    this.attach();
  }

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

  private configure(): void {
    this.htmlContent.addEventListener("submit", this.submitHandler);
  }

  private attach(): void {
    this.hostElement.insertAdjacentElement("afterbegin", this.htmlContent);
  }
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
