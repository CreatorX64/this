// Some JavaScript libraries include their type definition files by default.
// But for some other libraries like "faker", we need to manually install an
// NPM module that includes the type definition files. Most often that module
// is called @types/<module-name>, so for "faker" it is "@types/faker". These
// are created by third parties.
import faker from "faker";
import { Mappable } from "./Map";

export class User implements Mappable {
  firstName: string;
  // Careful! We're not intializing the "location" property here, we're
  // annotating its type. So "location" will be "undefined" when the object
  // is created if we don't initialize it in the constructor.
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.firstName = faker.name.firstName();
    this.location = {
      lat: Number(faker.address.latitude()),
      lng: Number(faker.address.longitude())
    };
  }

  getMarkerContent(): string {
    return `User First Name: ${this.firstName}`;
  }
}
