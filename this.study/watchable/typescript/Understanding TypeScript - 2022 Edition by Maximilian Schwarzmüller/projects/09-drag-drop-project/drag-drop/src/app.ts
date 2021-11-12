// Drag & Drop

interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

// Project

enum ProjectStatus {
  Active = "active",
  Finished = "finished"
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

// Project state management

type Listener<T> = (items: T[]) => void;

abstract class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
  private static instance: ProjectState;
  private projects: Project[] = [];

  static getInstance(): ProjectState {
    if (!this.instance) {
      this.instance = new ProjectState();
    }
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number): void {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );

    this.projects.push(newProject);

    this.notifyListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus): void {
    const project = this.projects.find((project) => project.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.notifyListeners();
    }
  }

  private notifyListeners(): void {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

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

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElem: HTMLTemplateElement;
  hostElem: T;
  htmlContent: U;

  constructor(
    templateElemId: string,
    hostElemId: string,
    insertAtBegin: boolean,
    newElemId?: string
  ) {
    this.templateElem = document.getElementById(
      templateElemId
    ) as HTMLTemplateElement;
    this.hostElem = document.getElementById(hostElemId) as T;

    const nodeCopy = document.importNode(this.templateElem.content, true);
    this.htmlContent = nodeCopy.firstElementChild as U;

    if (newElemId) {
      this.htmlContent.id = newElemId;
    }

    this.attach(insertAtBegin);
  }

  protected abstract configure(): void;

  protected abstract renderContent(): void;

  private attach(insertAtBegin: boolean): void {
    this.hostElem.insertAdjacentElement(
      insertAtBegin ? "afterbegin" : "beforeend",
      this.htmlContent
    );
  }
}

class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get personPeople(): string {
    return this.project.people === 1
      ? "1 person"
      : `${this.project.people.toString()} people`;
  }

  constructor(hostElemId: string, project: Project) {
    super("single-project", hostElemId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  @Bind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  @Bind
  dragEndHandler(_1: DragEvent) {
    console.log("DragEnd");
  }

  configure() {
    this.htmlContent.addEventListener("dragstart", this.dragStartHandler);
    this.htmlContent.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.htmlContent.querySelector("h2")!.textContent = this.project.title;
    this.htmlContent.querySelector(
      "h3"
    )!.textContent = `${this.personPeople} assigned.`;
    this.htmlContent.querySelector("p")!.textContent = this.project.description;
  }
}

class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[];

  constructor(private type: ProjectStatus) {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = [];
    this.configure();
    this.renderContent();
  }

  @Bind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listElem = this.htmlContent.querySelector("ul")!;
      listElem.classList.add("droppable");
    }
  }

  @Bind
  dragLeaveHandler(_1: DragEvent) {
    const listElem = this.htmlContent.querySelector("ul")!;
    listElem.classList.remove("droppable");
  }

  @Bind
  dropHandler(event: DragEvent) {
    const projectId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(projectId, this.type);
  }

  configure() {
    this.htmlContent.addEventListener("dragleave", this.dragLeaveHandler);
    this.htmlContent.addEventListener("dragover", this.dragOverHandler);
    this.htmlContent.addEventListener("drop", this.dropHandler);

    projectState.addListener((projects) => {
      const relevantProjects = projects.filter(
        (project) => project.status === this.type
      );
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    const headerTitle = `${this.type.toUpperCase()} PROJECTS`;
    this.htmlContent.querySelector("ul")!.id = listId;
    this.htmlContent.querySelector("h2")!.textContent = headerTitle;
  }

  private renderProjects() {
    const listElem = document.getElementById(
      `${this.type}-projects-list`
    ) as HTMLUListElement;
    listElem.innerHTML = "";

    for (const projectItem of this.assignedProjects) {
      new ProjectItem(this.htmlContent.querySelector("ul")!.id, projectItem);
    }
  }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

const projectState = ProjectState.getInstance();
const projectInput = new ProjectInput();
const activeProjectList = new ProjectList(ProjectStatus.Active);
const finishedProjectList = new ProjectList(ProjectStatus.Finished);
