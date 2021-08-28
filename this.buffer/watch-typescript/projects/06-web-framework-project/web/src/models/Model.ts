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

  get get() {
    return this.attributes.get.bind(this.attributes);
  }

  get on() {
    return this.events.on.bind(this.events);
  }

  get trigger() {
    return this.events.trigger.bind(this.events);
  }

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
