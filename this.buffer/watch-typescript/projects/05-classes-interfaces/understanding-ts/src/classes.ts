abstract class Department {
  // private readonly id: string;
  // private name: string; // "public" access modifier is the default

  static fiscalYear = 2020;
  protected employees: string[] = [];

  constructor(protected readonly id: string, private name: string) {
    // console.log(this.fiscalYear); // Error! Cannot access static member through "this"
    // console.log(Department.fiscalYear); // This is correct.
  }

  static createEmployee(name: string) {
    return { name };
  }

  // constructor(id: string, name: string) {
  //   this.id = id;
  //   this.name = name;
  // }

  // The parameter "this" is a hint to TypeScript of what "this" should refer to
  // inside the method. If we add this parameter, then "this" will always be
  // required to  be an instance of the Department class (because we gave it
  // that type) and the usage of the method will give TS error if used on
  // another type.
  // describe(this: Department): void {
  //   console.log(`Department (${this.id}): ${this.name}`);
  // }

  abstract describe(this: Department): void;

  addEmployee(employee: string): void {
    // this.id = "d2"; // Error, reaodonly property
    this.employees.push(employee);
  }

  printEmployeeInformation(): void {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];

  constructor(id: string, admins: string[]) {
    super(id, "IT"); // You need to call super() before doing anything with "this"
    this.admins = admins;
  }

  describe() {
    console.log("IT Department - ID: " + this.id);
  }
}

// Cannot extend more than one class.
class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport(): string {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found.");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value");
    }
    this.addReport(value);
  }

  // Private constructor for the "singleton" pattern
  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new AccountingDepartment("d2", []);
    }

    return this.instance;
  }

  describe() {
    console.log("Accounting Department - ID: " + this.id);
  }

  addEmployee(name: string): void {
    if (name !== "Max") {
      this.employees.push(name);
    }
  }

  addReport(text: string): void {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports(): void {
    console.log(this.reports);
  }
}

// const accounting = new Department("d1", "Accounting");
// console.log(accounting);
// accounting.employees[2] = "Anna"; // Error, private field

// const accountingCopy = { describe: accounting.describe };
// "Department: undefined" if we don't define "this" paremeter on Department.
// Error if we define "this" paremeter on Department.
// accountingCopy.describe(); // Error!

const it = new ITDepartment("d1", ["Max"]);
console.log(it);
it.addEmployee("Max");
it.addEmployee("Manu");
it.printEmployeeInformation();
it.describe();

// const accounting = new AccountingDepartment("d2", []); // Error! private constructor
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

console.log(accounting, accounting2);

console.log(accounting);
accounting.mostRecentReport = "Year end report";
accounting.addReport("Something went wrong...");
console.log(accounting.mostRecentReport);
accounting.addEmployee("Max");
accounting.addEmployee("Manu");
// accounting.printReports();
// accounting.printEmployeeInformation();
accounting.describe();

const employee1 = Department.createEmployee("Max");
console.log(employee1, Department.fiscalYear);
