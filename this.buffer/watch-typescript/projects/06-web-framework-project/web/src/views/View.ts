import { Model } from "../models/Model";

export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.render = this.render.bind(this);
    this.bindModel();
  }

  abstract template(): string;

  regionsMap(): { [key: string]: string } {
    return {};
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  bindModel(): void {
    this.model.on("change", this.render);
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");

      fragment.querySelectorAll(selector).forEach((elem) => {
        elem.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const elem = fragment.querySelector(selector);

      if (elem !== null) {
        this.regions[key] = elem;
      }
    }
  }

  onRender(): void {}

  render(): void {
    this.parent.innerHTML = "";

    const templateElem = document.createElement("template");
    templateElem.innerHTML = this.template();

    this.bindEvents(templateElem.content);
    this.mapRegions(templateElem.content);

    this.onRender();

    this.parent.append(templateElem.content);
  }
}
