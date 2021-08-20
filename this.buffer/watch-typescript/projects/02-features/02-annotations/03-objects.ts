const profile = {
  firstName: "Alex",
  age: 20,
  coords: {
    lat: 0,
    lng: 15
  },
  setAge(age: number): void {
    this.age = age;
  }
};

// Destructuring with annotations, can be utilized in use cases where type
// inference doesn't cut it (remember from the previous 01-variables file)
const { age, firstName }: { age: number, firstName: string } = profile;
const { coords: { lat, lng } }: { coords: { lat: number; lng: number} } = profile;


// One little trick that could make it easy to understand how to write
// type annotations for object destructruring scenarios is this: Write the
// annotation as if you're writing a type annotation for the whole object,
// but in the type annotation, only include the properties/methods that
// you're destructuring

const car = {
  model: "Honda",
  speed: 123,
  isOwned: true
};

const myCar: { model: string, speed: number, isOwned: boolean } = car;
const { model, speed }: { model: string, speed: number } = car;