// Prototypal inheritance.
//   myPerson --> Person.prototype --> Object.prototype --> null

// Using the "class" keyword to declare classes, define methods/properties on the object.

class Person
{
  constructor(firstName, lastName, age, likes = [])
  {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.likes = likes;
  }

  getBio()
  {
    let bio = `${this.firstName} is ${this.age}.`;

    this.likes.forEach(like =>
    {
      bio += ` ${this.firstName} likes ${like}.`;
    });

    return bio;
  }

  get fullName()
  {
    return `${this.firstName} ${this.lastName}`;
  }
  set fullName(value)
  {
    const names = value.split(" ");
    this.firstName = names[0];
    this.lastName = names[1];
  }
}

class Employee extends Person
{
  constructor(firstName, lastName, age, position, likes)
  {
    super(firstName, lastName, age, likes);
    this.position = position;
  }

  getBio()
  {
    return `${this.fullName} is a ${this.position}.`;
  }

  getYearsLeft()
  {
    return 65 - this.age;
  }
}

class Student extends Person
{
  constructor(firstName, lastName, age, grade, likes)
  {
    super(firstName, lastName, age, likes);
    this.grade = grade;
  }

  getBio()
  {
    const status = this.grade >= 70 ? "passing" : "failing";
    return `${this.firstName} is ${status} the class.`;
  }

  updateGrade(change)
  {
    this.grade += change;
  }
}

// Creating and using objects.

// const me = new Employee("Andrew", "Mead", 27, "Teacher", ["Teaching", "Biking"]);
// me.setName("Alexis Turner");
// console.log(me.getBio());
// console.log(me.getYearsLeft());

// const person2 = new Person("Clancey", "Turner", 51);
// console.log(person2.getBio());

const me = new Employee("Andrew", "Mead", 27, "Teacher", []);
me.fullName = "Clancey Turner";
console.log(me.getBio());

// Traditional way of defining constructor functions, and methods/properties on the object.

// const Person = function (firstName, lastName, age, likes = [])
// {
//   this.firstName = firstName;
//   this.lastName = lastName;
//   this.age = age;
//   this.likes = likes;
// };

// Person.prototype.getBio = function ()
// {
//   let bio = `${this.firstName} is ${this.age}.`;
//   this.likes.forEach(like =>
//   {
//     bio += ` ${this.firstName} likes ${like}.`;
//   });
//   return bio
// };

// Person.prototype.setName = function (fullName)
// {
//   const names = fullName.split(" ");
//   this.firstName = names[0];
//   this.lastName = names[1];
// };