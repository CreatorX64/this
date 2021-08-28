import axios, { AxiosPromise } from "axios";
import { Syncable, UniqueEntity } from "./Model";

export class APISync<T extends UniqueEntity> implements Syncable<T> {
  constructor(public rootURL: string) {}

  fetch(id: number): AxiosPromise<T> {
    return axios.get<T>(`${this.rootURL}/${id}`);
  }

  save(data: T): AxiosPromise<T> {
    const { id } = data;

    if (id) {
      return axios.put<T>(`${this.rootURL}/${id}`, data);
    } else {
      return axios.post<T>(this.rootURL, data);
    }
  }
}
