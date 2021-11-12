export type Person = {
  name: string;
  profession: string;
  pets: string[];
};

type FilterPersonFunc = (person: Person) => boolean;

function filterPeople(
  people: Person[],
  filterFunc: FilterPersonFunc
): Person[] {
  return people.filter(filterFunc);
}

export function findByName(people: Person[], name: string): Person[] {
  return filterPeople(people, (person) => person.name === name);
}

export function findByProfession(
  people: Person[],
  profession: string
): Person[] {
  return filterPeople(people, (person) => person.profession === profession);
}

export function findByPet(people: Person[], pet: string): Person[] {
  return filterPeople(people, (person) => person.pets.includes(pet));
}

export function getFirstPet(person: Person): string {
  return person.pets?.[0] ?? "none";
}
