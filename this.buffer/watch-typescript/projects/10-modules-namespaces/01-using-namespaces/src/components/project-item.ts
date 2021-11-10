/// <reference path="base-component.ts" />
/// <reference path="../decorators/bind.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />

namespace App {
  export class ProjectItem
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
      this.htmlContent.querySelector("p")!.textContent =
        this.project.description;
    }
  }
}
