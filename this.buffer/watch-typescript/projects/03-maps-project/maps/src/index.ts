/// <reference types="@types/google.maps" />

import { Company } from "./Company";
import { User } from "./User";
import { Map } from "./Map";

const user = new User();
const company = new Company();
const map = new Map("map");

// Even though initially we didn't explicity tell TS that our User and
// Company classes implement the Mappable interface, they still work.
// This is thanks to the implicit type checks
map.addMarker(user);
map.addMarker(company);
