import { jest } from "@jest/globals";
const luxon = jest.requireActual("luxon");

export class DateTime {
  static DATE_MED = luxon.DateTime.DATE_MED;

  static now() {
    return luxon.DateTime.fromMillis(0);
  }

  static fromMillis(ts = 0) {
    return luxon.DateTime.fromMillis(ts);
  }
}
