import faker from "faker";
import { Mappable } from "./Map";

// Writing the "implements" clause is optional as long as we actually
// implement the required properties & methods, but we still should write it to
// tell TypeScript explicitly that this class should meet the criteria defined
// by that interface. This way, if there're any errors regarding the interface
// and this class, we can track down the bug faster because TS compiler will
// point us to this location. So the only reason we woud add an "implements"
// clause is so that if we fail to properly implement an interface, TypeScript
// compiler can point us to the true source of the error.
export class Company implements Mappable {
  name: string;
  catchPhrase: string;
  // Careful! We're not intializing the "location" property here, we're
  // annotating its type. So "location" will be "undefined" when the object
  // is created if we don't initialize it in the constructor.
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.name = faker.company.companyName();
    this.catchPhrase = faker.company.catchPhrase();
    this.location = {
      lat: Number(faker.address.latitude()),
      lng: Number(faker.address.longitude())
    };
  }

  getMarkerContent(): string {
    return `
      <div>
        <h1>Company Name: ${this.name}</h1>
        <h3>Catch Phrase: ${this.catchPhrase}</h3>
      </div>
    `;
  }
}
