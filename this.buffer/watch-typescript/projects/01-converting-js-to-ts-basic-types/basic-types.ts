export function isACat(animal: string): boolean {
  return animal === "cat";
}

export function addNumbers(a: number, b: number): number {
  return a + b;
}

export function introduction(name: string): string {
  return `Hello ${name}`;
}

export function introducePerson(name: string): void {
  console.log(introduction(name));
}

export function dumpObject(type: string, obj: unknown): string {
  return `${type}:${JSON.stringify(obj)}`;
}

export function dumpStringOrNumber(info: string | number): string {
  return `value ${info}`;
}
