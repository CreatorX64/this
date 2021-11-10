export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
