class Person {
  constructor(name) {
    this.name = new NameString(name);
  }
}

class AnoymousPerson extends Person {
  constructor() {
    super();
    this.name = new NullString();
  }
}

class NullString {
  capitalize() {
    return this;
  }
  tigerify() {
    return this;
  }
  display() {
    return "";
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

const personOne = new Person("tony");
const personTwo = new AnoymousPerson("tony");

console.log(personOne.name.capitalize().tigerify().display());
console.log(personTwo.name.capitalize().tigerify().display());
