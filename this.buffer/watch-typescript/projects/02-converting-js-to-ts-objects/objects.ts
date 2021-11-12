export enum Status {
  FullTime,
  Temporary
}

type Person = {
  name: {
    first: string;
    middle?: string;
    last: string;
  };
  status: Status;
  profession: string;
};

type PersonMap = {
  [key: number]: Person;
};

export function introducePerson(person?: Person): string {
  return `Hello ${person?.name?.first ?? "First"} ${
    person?.name?.middle ?? "Middle"
  } ${person?.name?.last ?? "Last"}`;
}

export function isFulltimeEmployee(person: Person): boolean {
  return person.status === Status.FullTime;
}

export function personToString(
  person: Person = {
    status: Status.FullTime,
    name: {
      first: "unknown",
      last: "unknown"
    },
    profession: "unknown"
  }
): string {
  return JSON.stringify(person, null, 2);
}

export function getProfessions(personMap: PersonMap): string {
  return Object.values(personMap)
    .map(({ profession }) => profession)
    .join("\n");
}
