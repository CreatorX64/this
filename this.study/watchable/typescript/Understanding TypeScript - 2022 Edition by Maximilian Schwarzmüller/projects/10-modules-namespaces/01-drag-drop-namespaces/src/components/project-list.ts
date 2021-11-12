/// <reference path="base-component.ts" />
/// <reference path="../decorators/bind.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />

namespace App {
  export class ProjectList
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
}
