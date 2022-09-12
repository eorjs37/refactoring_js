class Person {
  constructor(name) {
    this.name = name;
  }
}

class AnoymousPerson extends Person {
  constructor() {
    super();
    this.name = null;
  }
}

class NullString {
  capitalize() {
    return null;
  }
}

class NameString extends String {
  capitalize() {
    return new NameString(this[0].toLocaleUpperCase() + this.substring(1));
  }
  tigerify(string) {
    if (string === null) {
      return null;
    } else {
      return new NameString(`${this}, the tiger`);
    }
  }
  display() {
    if (this === null) {
      return "";
    } else {
      return this.toString();
    }
  }
}

personOne = new Person("tony");
personTwo = new AnoymousPerson("tony");

console.log(personOne.name.c);
console.log();
