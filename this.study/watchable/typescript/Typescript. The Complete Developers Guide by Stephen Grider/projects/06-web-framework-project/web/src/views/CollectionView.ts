import { Collection } from "../models/Collection";

export abstract class CollectionView<T, K> {
  constructor(
    public parentElem: Element,
    public collection: Collection<T, K>
  ) {}

  abstract renderItem(model: T, itemParent: Element): void;

  render(): void {
    this.parentElem.innerHTML = "";

    const templateElem = document.createElement("template");

    for (let model of this.collection.models) {
      const itemParent = document.createElement("div");
      this.renderItem(model, itemParent);
      templateElem.content.append(itemParent);
    }

    this.parentElem.append(templateElem.content);
  }
}
