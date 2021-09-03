import { AxiosPromise, AxiosResponse } from "axios";

export type Callback = () => void;

export interface UniqueEntity {
  id?: number;
}

export interface AttributeCollection<T> {
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
  set(value: T): void;
}

export interface EventHost {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

export interface Syncable<T> {
  fetch(id: number): AxiosPromise<T>;
  save(data: T): AxiosPromise<T>;
}

export class Model<T extends UniqueEntity> {
  constructor(
    private attributes: AttributeCollection<T>,
    private events: EventHost,
    private sync: Syncable<T>
  ) {}

  // These assignments will be moved to the top of the constructor function
  // once the code is transpiled. So if there're any existing code in the
  // constructor body, these assignments will go above them. However, in the
  // constructor, our use of "parameter properties" will ensure that the
  // properties are set before the constructor body is run. So we can use this
  // shorthand syntax only because we've used parameter properties in our
  // constructor to pass in the dependecies of these shorthands. If we didn't
  // use parameter properties and instead initialized those properties manually,
  // the below shorthands would break because we would effectively be accessing
  // our class properties' properties before initializing them.
  get = this.attributes.get.bind(this.attributes);
  on = this.events.on.bind(this.events);
  trigger = this.events.trigger.bind(this.events);

  // get get() {
  //   return this.attributes.get.bind(this.attributes);
  // }

  // get on() {
  //   return this.events.on.bind(this.events);
  // }

  // get trigger() {
  //   return this.events.trigger.bind(this.events);
  // }

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  fetch(): void {
    const id = this.get("id");

    if (typeof id !== "number") {
      throw new Error("Cannot fetch without an id");
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
      this.events.trigger("change");
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger("save");
      })
      .catch(() => {
        this.trigger("error");
      });
  }
}
