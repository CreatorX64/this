import axios from "axios";
import { Eventing } from "./Eventing";

export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string, public assembleModel: (json: K) => T) {}

  // Here, we don't use the shorthand syntax (field initializers) because we
  // would have to physically put them on top of "models" and "events"
  // initializations above, and that's not a good practice, because we would be
  // relying on the order of property initializations in the class definition
  // which can easily change in the future.
  get on() {
    return this.events.on.bind(this.events);
  }

  get trigger() {
    return this.events.trigger.bind(this.events);
  }

  fetch(): void {
    axios.get<K[]>(this.rootUrl).then((response) => {
      response.data.forEach((value) => {
        this.models.push(this.assembleModel(value));
      });
      this.trigger("change");
    });
  }
}
